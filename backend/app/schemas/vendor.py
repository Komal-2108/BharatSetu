from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class VendorCreate(BaseModel):
    name: str = Field(..., example="Ramesh Sharma")
    phone: str = Field(..., example="+919876543210")
    email: EmailStr = Field(..., example="ramesh@ujjainhomestay.in")
    password: str = Field(..., min_length=6, example="securePassword123")
    business_type: str = Field(..., example="homestay", description="homestay, guide, package, artisan")
    city: str = Field(..., example="Ujjain")
    state: str = Field(..., example="Madhya Pradesh")
    description: Optional[str] = Field(None, example="Heritage homestay near Mahakaleshwar temple")
    id_doc_url: Optional[str] = Field(None, example="http://localhost:8000/uploads/docs/kyc123.jpg")
    language_pref: Optional[str] = Field("en", example="hi")

class VendorLogin(BaseModel):
    email: EmailStr = Field(..., example="ramesh@ujjainhomestay.in")
    password: str = Field(..., example="securePassword123")

class VendorResponse(BaseModel):
    id: str
    name: str
    phone: str
    email: str
    business_type: str
    city: str
    state: str
    description: Optional[str] = None
    id_doc_url: Optional[str] = None
    verified: bool
    language_pref: str
    created_at: datetime

    class Config:
        from_attributes = True

class VendorAuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    vendor: VendorResponse

class VendorPublicResponse(BaseModel):
    id: str
    name: str
    phone: str
    business_type: str
    city: str
    state: str
    description: Optional[str] = None
    verified: bool
    language_pref: str

    class Config:
        from_attributes = True
