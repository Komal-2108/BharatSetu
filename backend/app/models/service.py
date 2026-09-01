import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Service(Base):
    __tablename__ = "services"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    vendor_id = Column(String(36), ForeignKey("vendors.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False, index=True)  # homestay, guide, package, artisan
    description = Column(Text, nullable=False)
    price = Column(Float, nullable=False)
    location = Column(String(255), nullable=False, index=True)
    images = Column(JSON, default=list, nullable=False)  # List of image URLs
    available_dates = Column(JSON, default=list, nullable=False)  # List of date strings YYYY-MM-DD
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    vendor = relationship("Vendor", back_populates="services")
    bookings = relationship("Booking", back_populates="service", cascade="all, delete-orphan")
