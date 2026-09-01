from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.booking import Booking
from app.models.service import Service
from app.models.vendor import Vendor
from app.models.review import Review
from app.schemas.booking import BookingCreate, BookingStatusUpdate, BookingResponse
from app.schemas.review import ReviewCreate, ReviewResponse
from app.schemas.service import ServiceResponse
from app.core.whatsapp import notify_new_booking, notify_booking_status_update

router = APIRouter(prefix="/bookings", tags=["Bookings"])

def enrich_booking_response(booking: Booking, db: Session, whatsapp_sent: bool = True) -> BookingResponse:
    """Helper to convert a Booking DB instance to BookingResponse with attached service & review status."""
    service = db.query(Service).filter(Service.id == booking.service_id).first()
    service_resp = None
    if service:
        vendor = db.query(Vendor).filter(Vendor.id == service.vendor_id).first()
        service_resp = ServiceResponse(
            id=service.id,
            vendor_id=service.vendor_id,
            title=service.title,
            category=service.category,
            description=service.description,
            price=service.price,
            location=service.location,
            images=service.images or [],
            available_dates=service.available_dates or [],
            created_at=service.created_at,
            vendor_verified=vendor.verified if vendor else False,
            vendor_name=vendor.name if vendor else None
        )

    has_review = db.query(Review).filter(Review.booking_id == booking.id).first() is not None

    return BookingResponse(
        id=booking.id,
        service_id=booking.service_id,
        customer_name=booking.customer_name,
        customer_phone=booking.customer_phone,
        customer_email=booking.customer_email,
        booking_date=booking.booking_date,
        status=booking.status,
        payment_status=booking.payment_status,
        created_at=booking.created_at,
        whatsapp_sent=whatsapp_sent,
        service=service_resp,
        has_review=has_review
    )

@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(booking_in: BookingCreate, db: Session = Depends(get_db)):
    """
    FR-07, FR-08 & BR-03, BR-08: Customer Booking Creation & WhatsApp Delivery
    1. Validates service existence and requested date availability (BR-03).
    2. Commits booking record to database FIRST.
    3. Attempts WhatsApp delivery to customer and vendor without affecting DB persistence on failure (BR-08).
    """
    # 1. Fetch Service and Vendor
    service = db.query(Service).filter(Service.id == booking_in.service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with ID '{booking_in.service_id}' not found."
        )

    vendor = db.query(Vendor).filter(Vendor.id == service.vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Vendor associated with this service no longer exists."
        )

    # 2. BR-03: Check Date Availability
    available_dates = service.available_dates or []
    if available_dates and booking_in.booking_date not in available_dates:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"The date '{booking_in.booking_date}' is not in the available dates list for this service. Available dates: {available_dates}"
        )

    # 3. Create & Commit Booking to DB FIRST
    booking = Booking(
        service_id=booking_in.service_id,
        customer_name=booking_in.customer_name,
        customer_phone=booking_in.customer_phone,
        customer_email=booking_in.customer_email,
        booking_date=booking_in.booking_date,
        status="pending",
        payment_status="pending"
    )
    db.add(booking)
    db.commit()
    db.refresh(booking)

    # 4. FR-08 & BR-08: Dispatch WhatsApp Notifications
    whatsapp_sent = True
    try:
        notify_res = await notify_new_booking(
            booking_id=booking.id,
            customer_name=booking.customer_name,
            customer_phone=booking.customer_phone,
            vendor_name=vendor.name,
            vendor_phone=vendor.phone,
            service_title=service.title,
            booking_date=booking.booking_date
        )
        whatsapp_sent = notify_res.get("customer_notified", True)
    except Exception as e:
        # Failure in WhatsApp does NOT invalidate DB record (BR-08)
        print(f"Warning: WhatsApp notification failed for booking {booking.id}: {e}")
        whatsapp_sent = False

    return enrich_booking_response(booking, db, whatsapp_sent=whatsapp_sent)

@router.get("/vendor/{vendor_id}", response_model=List[BookingResponse])
def get_vendor_booking_inbox(
    vendor_id: str,
    status_filter: Optional[str] = Query(None, description="Optional status filter: pending, confirmed, completed, cancelled"),
    db: Session = Depends(get_db)
):
    """
    FR-09: Vendor Booking Inbox
    Lists incoming bookings for services provided by the specified vendor.
    """
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vendor with ID '{vendor_id}' not found."
        )

    query = (
        db.query(Booking)
        .join(Service, Booking.service_id == Service.id)
        .filter(Service.vendor_id == vendor_id)
    )

    if status_filter:
        query = query.filter(Booking.status == status_filter.lower())

    bookings = query.order_by(Booking.created_at.desc()).all()
    return [enrich_booking_response(b, db) for b in bookings]

@router.get("/{booking_id}", response_model=BookingResponse)
def get_booking_by_id(booking_id: str, db: Session = Depends(get_db)):
    """
    GET /bookings/{id}
    Retrieves detailed booking status for customers or vendors.
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID '{booking_id}' not found."
        )
    return enrich_booking_response(booking, db)

@router.patch("/{booking_id}/status", response_model=BookingResponse)
async def update_booking_status(
    booking_id: str,
    status_in: BookingStatusUpdate,
    db: Session = Depends(get_db)
):
    """
    FR-10 & BR-09: Booking Status Transitions & Updates
    Updates booking status ('confirmed', 'cancelled', 'completed').
    BR-09 rule: A cancelled booking cannot be marked completed.
    Triggers WhatsApp status notification to customer.
    """
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID '{booking_id}' not found."
        )

    new_status = status_in.status.lower().strip()
    valid_statuses = ["pending", "confirmed", "completed", "cancelled"]
    if new_status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status '{new_status}'. Allowed values: {valid_statuses}"
        )

    # BR-09: A cancelled booking cannot be marked completed
    if booking.status == "cancelled" and new_status == "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Business Rule Violation (BR-09): A cancelled booking cannot be marked completed."
        )

    booking.status = new_status
    if new_status == "completed":
        booking.payment_status = "paid"  # Simulate payment settlement on completion

    db.commit()
    db.refresh(booking)

    # Send status update via WhatsApp
    service = db.query(Service).filter(Service.id == booking.service_id).first()
    whatsapp_sent = True
    if service:
        try:
            whatsapp_sent = await notify_booking_status_update(
                booking_id=booking.id,
                customer_name=booking.customer_name,
                customer_phone=booking.customer_phone,
                service_title=service.title,
                booking_date=booking.booking_date,
                new_status=new_status
            )
        except Exception:
            whatsapp_sent = False

    return enrich_booking_response(booking, db, whatsapp_sent=whatsapp_sent)

@router.post("/{booking_id}/review", response_model=ReviewResponse, status_code=status.HTTP_201_CREATED)
def create_booking_review(
    booking_id: str,
    review_in: ReviewCreate,
    db: Session = Depends(get_db)
):
    """
    FR-11, BR-05, BR-06, BR-07: Review Submission for Completed Bookings
    - BR-05: Only completed bookings can receive reviews.
    - BR-06: One booking can have at most one review.
    - BR-07: Ratings must be integers 1 to 5.
    """
    # Fetch booking
    booking = db.query(Booking).filter(Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking with ID '{booking_id}' not found."
        )

    # BR-05: Check if booking is completed
    if booking.status.lower() != "completed":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Business Rule Violation (BR-05): Reviews can only be submitted for completed bookings. Current status: '{booking.status}'."
        )

    # BR-06: Check if review already exists
    existing_review = db.query(Review).filter(Review.booking_id == booking_id).first()
    if existing_review:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Business Rule Violation (BR-06): A review has already been submitted for this booking."
        )

    # BR-07: Rating 1..5 is enforced by Pydantic ReviewCreate model
    review = Review(
        booking_id=booking.id,
        rating=review_in.rating,
        comment=review_in.comment
    )
    db.add(review)
    db.commit()
    db.refresh(review)

    service = db.query(Service).filter(Service.id == booking.service_id).first()

    return ReviewResponse(
        id=review.id,
        booking_id=review.booking_id,
        rating=review.rating,
        comment=review.comment,
        created_at=review.created_at,
        service_id=service.id if service else None,
        service_title=service.title if service else None,
        customer_name=booking.customer_name
    )
