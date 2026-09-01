from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from app.schemas.vendor import VendorPublicResponse

class ServiceCreate(BaseModel):
    title: str = Field(..., example="Divine Mahakal Temple Guided Heritage Walk")
    category: str = Field(..., example="guide", description="homestay, guide, package, artisan")
    description: str = Field(..., example="3-hour authentic guided tour covering Bhasma Aarti entry tips and historical facts.")
    price: float = Field(..., gt=0, example=1500.0)
    location: str = Field(..., example="Ujjain")
    images: List[str] = Field(default_factory=list, example=["http://localhost:8000/uploads/mahakal1.jpg"])
    available_dates: List[str] = Field(default_factory=list, example=["2026-09-05", "2026-09-06", "2026-09-07"])

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = Field(None, gt=0)
    location: Optional[str] = None
    images: Optional[List[str]] = None
    available_dates: Optional[List[str]] = None

class ServiceResponse(BaseModel):
    id: str
    vendor_id: str
    title: str
    category: str
    description: str
    price: float
    location: str
    images: List[str]
    available_dates: List[str]
    created_at: datetime
    avg_rating: Optional[float] = Field(None, example=4.8)
    total_reviews: int = Field(0, example=12)
    vendor_verified: bool = Field(False)
    vendor_name: Optional[str] = None

    class Config:
        from_attributes = True

class ServiceDetailResponse(ServiceResponse):
    vendor: VendorPublicResponse
