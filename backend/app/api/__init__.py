from app.api.vendors import router as vendors_router
from app.api.services import router as services_router
from app.api.bookings import router as bookings_router
from app.api.upload import router as upload_router

__all__ = ["vendors_router", "services_router", "bookings_router", "upload_router"]
