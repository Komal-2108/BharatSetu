from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from typing import List, Optional
from app.database import get_db
from app.models.vendor import Vendor
from app.models.service import Service
from app.models.booking import Booking
from app.models.review import Review
from app.schemas.service import ServiceCreate, ServiceUpdate, ServiceResponse, ServiceDetailResponse
from app.schemas.vendor import VendorPublicResponse
from app.api.deps import get_current_vendor

router = APIRouter(prefix="/services", tags=["Services"])

def compute_service_rating(service_id: str, db: Session):
    """Calculates average rating and total review count for a service."""
    result = (
        db.query(
            func.avg(Review.rating).label("avg_rating"),
            func.count(Review.id).label("total_reviews")
        )
        .join(Booking, Review.booking_id == Booking.id)
        .filter(Booking.service_id == service_id)
        .first()
    )
    avg_rating = float(result.avg_rating) if result and result.avg_rating else None
    total_reviews = int(result.total_reviews) if result and result.total_reviews else 0
    return avg_rating, total_reviews

@router.get("", response_model=List[ServiceResponse])
def search_services(
    location: Optional[str] = Query(None, description="Filter by location (e.g. Ujjain, Varanasi, Goa)"),
    category: Optional[str] = Query(None, description="Filter by category (homestay, guide, package, artisan)"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price filter"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price filter"),
    search: Optional[str] = Query(None, description="Keyword search in title or description"),
    vendor_id: Optional[str] = Query(None, description="Filter by specific vendor ID"),
    db: Session = Depends(get_db)
):
    """
    FR-04 & FR-05: Service Discovery, Search & Filter
    Returns matching service listings enriched with average rating, vendor verification status, and title.
    """
    query = db.query(Service, Vendor).join(Vendor, Service.vendor_id == Vendor.id)

    if location:
        query = query.filter(Service.location.ilike(f"%{location.strip()}%"))
    
    if category:
        query = query.filter(Service.category.ilike(f"%{category.strip()}%"))
        
    if min_price is not None:
        query = query.filter(Service.price >= min_price)
        
    if max_price is not None:
        query = query.filter(Service.price <= max_price)
        
    if search:
        search_term = f"%{search.strip()}%"
        query = query.filter(
            or_(
                Service.title.ilike(search_term),
                Service.description.ilike(search_term),
                Service.location.ilike(search_term)
            )
        )
        
    if vendor_id:
        query = query.filter(Service.vendor_id == vendor_id)

    results = query.order_by(Service.created_at.desc()).all()

    response_list = []
    for service, vendor in results:
        avg_rating, total_reviews = compute_service_rating(service.id, db)
        
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
            avg_rating=round(avg_rating, 1) if avg_rating else None,
            total_reviews=total_reviews,
            vendor_verified=vendor.verified,
            vendor_name=vendor.name
        )
        response_list.append(service_resp)

    return response_list

@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(
    service_in: ServiceCreate,
    current_vendor: Vendor = Depends(get_current_vendor),
    db: Session = Depends(get_db)
):
    """
    FR-03 & BR-01: Authenticated Service Creation
    Authenticated vendors create a service with title, category, description, price, location, images and available dates.
    """
    service = Service(
        vendor_id=current_vendor.id,
        title=service_in.title,
        category=service_in.category.lower(),
        description=service_in.description,
        price=service_in.price,
        location=service_in.location,
        images=service_in.images,
        available_dates=service_in.available_dates
    )
    db.add(service)
    db.commit()
    db.refresh(service)

    return ServiceResponse(
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
        avg_rating=None,
        total_reviews=0,
        vendor_verified=current_vendor.verified,
        vendor_name=current_vendor.name
    )

@router.get("/{service_id}", response_model=ServiceDetailResponse)
def get_service_details(service_id: str, db: Session = Depends(get_db)):
    """
    FR-06: Service Details Page
    Displays full service information, vendor information, rating, availability dates, and review summary.
    """
    record = db.query(Service, Vendor).join(Vendor, Service.vendor_id == Vendor.id).filter(Service.id == service_id).first()
    if not record:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with ID '{service_id}' not found."
        )

    service, vendor = record
    avg_rating, total_reviews = compute_service_rating(service.id, db)

    vendor_pub = VendorPublicResponse(
        id=vendor.id,
        name=vendor.name,
        phone=vendor.phone,
        business_type=vendor.business_type,
        city=vendor.city,
        state=vendor.state,
        description=vendor.description,
        verified=vendor.verified,
        language_pref=vendor.language_pref
    )

    return ServiceDetailResponse(
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
        avg_rating=round(avg_rating, 1) if avg_rating else None,
        total_reviews=total_reviews,
        vendor_verified=vendor.verified,
        vendor_name=vendor.name,
        vendor=vendor_pub
    )

@router.patch("/{service_id}", response_model=ServiceResponse)
def update_service(
    service_id: str,
    service_in: ServiceUpdate,
    current_vendor: Vendor = Depends(get_current_vendor),
    db: Session = Depends(get_db)
):
    """
    BR-04: Update Service
    Vendors can update only their own services.
    """
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with ID '{service_id}' not found."
        )

    if service.vendor_id != current_vendor.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized: You can only edit your own service listings."
        )

    update_data = service_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(service, field, value)

    db.commit()
    db.refresh(service)

    avg_rating, total_reviews = compute_service_rating(service.id, db)

    return ServiceResponse(
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
        avg_rating=round(avg_rating, 1) if avg_rating else None,
        total_reviews=total_reviews,
        vendor_verified=current_vendor.verified,
        vendor_name=current_vendor.name
    )

@router.delete("/{service_id}", status_code=status.HTTP_200_OK)
def delete_service(
    service_id: str,
    current_vendor: Vendor = Depends(get_current_vendor),
    db: Session = Depends(get_db)
):
    """
    BR-04: Delete Service
    Vendors can delete only their own services.
    """
    service = db.query(Service).filter(Service.id == service_id).first()
    if not service:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Service with ID '{service_id}' not found."
        )

    if service.vendor_id != current_vendor.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Unauthorized: You can only delete your own service listings."
        )

    db.delete(service)
    db.commit()

    return {"message": "Service successfully deleted.", "id": service_id}
