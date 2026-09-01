import os
import sys
import argparse
import uvicorn

# Ensure backend directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.config import settings
from app.seed import seed_database

def main():
    parser = argparse.ArgumentParser(description="BharatSetu FastAPI Backend Server Runner")
    parser.add_argument("--seed", action="store_true", help="Seed database with initial mock data before starting")
    parser.add_argument("--host", default=settings.HOST, help=f"Host interface to bind (default: {settings.HOST})")
    parser.add_argument("--port", type=int, default=settings.PORT, help=f"Port number (default: {settings.PORT})")
    parser.add_argument("--reload", action="store_true", default=settings.DEBUG, help="Enable auto-reload on code changes")
    args = parser.parse_args()

    if args.seed:
        print("🌱 Seeding database...")
        seed_database()

    print(f"🚀 Starting BharatSetu Backend Server at http://{args.host}:{args.port}")
    print(f"📖 Interactive API Docs (Swagger): http://{args.host}:{args.port}/docs")
    print(f"📚 ReDoc Documentation: http://{args.host}:{args.port}/redoc")

    uvicorn.run(
        "app.main:app",
        host=args.host,
        port=args.port,
        reload=args.reload
    )

if __name__ == "__main__":
    main()
