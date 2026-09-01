import uuid
from datetime import datetime
from sqlalchemy import Column, String, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from app.database import Base

def generate_uuid():
    return str(uuid.uuid4())

class Vendor(Base):
    __tablename__ = "vendors"

    id = Column(String(36), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    business_type = Column(String(100), nullable=False)  # homestay, guide, package, artisan
    city = Column(String(100), nullable=False)
    state = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    id_doc_url = Column(Text, nullable=True)
    verified = Column(Boolean, default=False, nullable=False)
    language_pref = Column(String(10), default="en", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    services = relationship("Service", back_populates="vendor", cascade="all, delete-orphan")
