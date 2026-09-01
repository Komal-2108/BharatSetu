from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class ReviewCreate(BaseModel):
    rating: int = Field(..., ge=1, le=5, example=5, description="Integer rating from 1 to 5")
    comment: str = Field(..., min_length=3, example="Wonderful experience! Highly knowledgeable guide.")

class ReviewResponse(BaseModel):
    id: str
    booking_id: str
    rating: int
    comment: str
    created_at: datetime
    service_id: Optional[str] = None
    service_title: Optional[str] = None
    customer_name: Optional[str] = None

    class Config:
        from_attributes = True
