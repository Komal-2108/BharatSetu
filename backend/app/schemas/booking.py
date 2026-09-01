from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from app.schemas.service import ServiceResponse

class BookingCreate(BaseModel):
    service_id: str = Field(..., example="550e8400-e29b-41d4-a716-446655440000")
    customer_name: str = Field(..., example="Aarav Sharma")
    customer_phone: str = Field(..., example="+919876543210")
    customer_email: EmailStr = Field(..., example="aarav@gmail.com")
    booking_date: str = Field(..., example="2026-09-05", description="Date string YYYY-MM-DD")

class BookingStatusUpdate(BaseModel):
    status: str = Field(..., example="confirmed", description="confirmed, completed, cancelled")

class BookingResponse(BaseModel):
    id: str
    service_id: str
    customer_name: str
    customer_phone: str
    customer_email: str
    booking_date: str
    status: str
    payment_status: str
    created_at: datetime
    whatsapp_sent: bool = Field(True, description="Indicates whether WhatsApp notification succeeded")
    service: Optional[ServiceResponse] = None
    has_review: bool = Field(False)

    class Config:
        from_attributes = True
