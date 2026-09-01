import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.config import settings
from app.database import init_db
from app.api import vendors_router, services_router, bookings_router, upload_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description=(
        "**BHARATSETU REST API**\n\n"
        "Hyperlocal Travel & Local Service Booking Platform Backend MVP.\n\n"
        "Features:\n"
        "- 🏨 Vendor Registration, JWT Auth & ID Document Upload\n"
        "- 🛠️ Service Creation, Discovery, and Search/Filter\n"
        "- 📅 Customer Booking with Date Availability Validation\n"
        "- 📲 Dual WhatsApp Confirmation via Twilio (Customer & Vendor)\n"
        "- 📥 Vendor Booking Management & Status Transitions\n"
        "- ⭐ Verified-Booking Review & Rating System\n"
        "- 🏅 Verified Vendor Badge Support\n"
    ),
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS Middleware for Next.js frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure upload directory exists and serve as static files
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include API Routers under /api/v1
app.include_router(vendors_router, prefix=settings.API_V1_STR)
app.include_router(services_router, prefix=settings.API_V1_STR)
app.include_router(bookings_router, prefix=settings.API_V1_STR)
app.include_router(upload_router, prefix=settings.API_V1_STR)

@app.on_event("startup")
def startup_event():
    """Initialize database tables on application startup."""
    init_db()

@app.get("/", tags=["Health & Root"])
def read_root():
    return {
        "project": settings.PROJECT_NAME,
        "status": "online",
        "version": "1.0.0",
        "docs": "/docs",
        "api_v1": settings.API_V1_STR
    }

@app.get("/health", tags=["Health & Root"])
def health_check():
    return {"status": "ok", "database": "connected"}
