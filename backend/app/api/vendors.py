from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import get_db
from app.models.vendor import Vendor
from app.models.service import Service
from app.models.booking import Booking
from app.models.review import Review
from app.schemas.vendor import VendorCreate, VendorLogin, VendorResponse, VendorAuthResponse, VendorPublicResponse
from app.schemas.review import ReviewResponse
from app.core.security import get_password_hash, verify_password, create_access_token
from app.api.deps import get_current_vendor

router = APIRouter(prefix="/vendors", tags=["Vendors"])

@router.post("/register", response_model=VendorAuthResponse, status_code=status.HTTP_201_CREATED)
def register_vendor(vendor_in: VendorCreate, db: Session = Depends(get_db)):
    """
    FR-01: Vendor Registration
    Registers a new vendor and returns authentication credentials.
    """
    # Check duplicate email
    existing_vendor = db.query(Vendor).filter(Vendor.email == vendor_in.email).first()
    if existing_vendor:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A vendor account with this email already exists."
        )

    # Create new vendor
    hashed_pwd = get_password_hash(vendor_in.password)
    vendor = Vendor(
        name=vendor_in.name,
        phone=vendor_in.phone,
        email=vendor_in.email,
        hashed_password=hashed_pwd,
        business_type=vendor_in.business_type.lower(),
        city=vendor_in.city,
        state=vendor_in.state,
        description=vendor_in.description,
        id_doc_url=vendor_in.id_doc_url,
        verified=False,  # Unverified by default
        language_pref=vendor_in.language_pref or "en"
    )
    db.add(vendor)
    db.commit()
    db.refresh(vendor)

    # Generate JWT token
    access_token = create_access_token(subject=vendor.id)

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "vendor": vendor
    }

@router.post("/login", response_model=VendorAuthResponse)
def login_vendor(credentials: VendorLogin, db: Session = Depends(get_db)):
    """
    FR-02: Vendor Login
    Authenticates vendor credentials and returns JWT access token.
    """
    vendor = db.query(Vendor).filter(Vendor.email == credentials.email).first()
    if not vendor or not verify_password(credentials.password, vendor.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"}
        )

    access_token = create_access_token(subject=vendor.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "vendor": vendor
    }

@router.get("/me", response_model=VendorResponse)
def get_current_vendor_profile(current_vendor: Vendor = Depends(get_current_vendor)):
    """Get logged in vendor's own profile."""
    return current_vendor

@router.get("/{vendor_id}", response_model=VendorPublicResponse)
def get_vendor_by_id(vendor_id: str, db: Session = Depends(get_db)):
    """
    GET /vendors/{id}
    Retrieves public details of a vendor.
    """
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vendor with ID '{vendor_id}' not found."
        )
    return vendor

@router.get("/{vendor_id}/reviews", response_model=List[ReviewResponse])
def get_vendor_reviews(vendor_id: str, db: Session = Depends(get_db)):
    """
    GET /vendors/{id}/reviews
    Fetches all authentic customer reviews for all services offered by this vendor.
    """
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vendor with ID '{vendor_id}' not found."
        )

    # Join Review -> Booking -> Service where service.vendor_id == vendor_id
    results = (
        db.query(Review, Booking, Service)
        .join(Booking, Review.booking_id == Booking.id)
        .join(Service, Booking.service_id == Service.id)
        .filter(Service.vendor_id == vendor_id)
        .order_by(Review.created_at.desc())
        .all()
    )

    review_responses = []
    for review, booking, service in results:
        resp = ReviewResponse(
            id=review.id,
            booking_id=review.booking_id,
            rating=review.rating,
            comment=review.comment,
            created_at=review.created_at,
            service_id=service.id,
            service_title=service.title,
            customer_name=booking.customer_name
        )
        review_responses.append(resp)

    return review_responses

@router.patch("/{vendor_id}/verify", response_model=VendorPublicResponse)
def toggle_vendor_verification(
    vendor_id: str,
    verified: bool = True,
    db: Session = Depends(get_db)
):
    """
    FR-13: Verification Badge / Demo Admin Simulation
    Toggles a vendor's verification badge status.
    """
    vendor = db.query(Vendor).filter(Vendor.id == vendor_id).first()
    if not vendor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Vendor with ID '{vendor_id}' not found."
        )

    vendor.verified = verified
    db.commit()
    db.refresh(vendor)
    return vendor
