import sys
import os
from datetime import datetime, timedelta

# Ensure parent directory is in python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import SessionLocal, init_db
from app.models.vendor import Vendor
from app.models.service import Service
from app.models.booking import Booking
from app.models.review import Review
from app.core.security import get_password_hash

def seed_database():
    print("🌱 Initializing Database for BharatSetu...")
    init_db()
    db = SessionLocal()

    try:
        # Check if already seeded
        if db.query(Vendor).first():
            print("⚡ Database already contains data. Skipping seed process.")
            return

        print("🛠️ Creating Verified Vendors...")
        
        # 1. Vendor: Ramesh Sharma (Ujjain - Homestay & Guide)
        v1 = Vendor(
            name="Ramesh Sharma",
            phone="+919876543210",
            email="ramesh@ujjainhomestay.in",
            hashed_password=get_password_hash("vendor123"),
            business_type="homestay",
            city="Ujjain",
            state="Madhya Pradesh",
            description="Authentic family homestay 500m from Mahakaleshwar Temple with home-cooked Malwi thali.",
            id_doc_url="https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
            verified=True,
            language_pref="hi"
        )

        # 2. Vendor: Pandit Anand Shastri (Varanasi - Heritage Tour Guide)
        v2 = Vendor(
            name="Pandit Anand Shastri",
            phone="+919812345678",
            email="anand@varanasiguides.com",
            hashed_password=get_password_hash("vendor123"),
            business_type="guide",
            city="Varanasi",
            state="Uttar Pradesh",
            description="3rd Generation Heritage Guide specializing in Subah-e-Banaras morning boat tours and evening Ganga Aarti explanation.",
            id_doc_url="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
            verified=True,
            language_pref="hi"
        )

        # 3. Vendor: Sunita Devi (Kutch - Handicrafts & Artisan)
        v3 = Vendor(
            name="Sunita Devi",
            phone="+919711223344",
            email="sunita@kutchartisan.org",
            hashed_password=get_password_hash("vendor123"),
            business_type="artisan",
            city="Bhuj",
            state="Gujarat",
            description="Master artisan of traditional Kutchi Rogan art and mirrorwork embroidery workshops.",
            id_doc_url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
            verified=True,
            language_pref="gu"
        )

        # 4. Vendor: Himalayan Eco Treks (Manali - Local Tour Operator)
        v4 = Vendor(
            name="Himalayan Eco Treks (Vikram Negi)",
            phone="+919654321098",
            email="vikram@himalayanecotreks.com",
            hashed_password=get_password_hash("vendor123"),
            business_type="package",
            city="Manali",
            state="Himachal Pradesh",
            description="Local eco-guided treks, apple orchard camping, and village immersion tours in Kullu valley.",
            id_doc_url="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600",
            verified=False,  # Unverified vendor to test verification toggle
            language_pref="en"
        )

        db.add_all([v1, v2, v3, v4])
        db.commit()

        print("📦 Creating Services...")
        
        today = datetime.now()
        dates_next_7 = [(today + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(1, 8)]
        dates_next_14 = [(today + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(1, 15)]

        s1 = Service(
            vendor_id=v1.id,
            title="Mahakal Darshan Heritage Homestay Room",
            category="homestay",
            description="Spacious AC room with attached bath, clean linen, and complimentary traditional breakfast. Located 5 minutes walk from temple gate 1.",
            price=1800.0,
            location="Ujjain",
            images=[
                "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800",
                "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800"
            ],
            available_dates=dates_next_14
        )

        s2 = Service(
            vendor_id=v1.id,
            title="Private Bhasma Aarti Guidance & Temple Walk",
            category="guide",
            description="Full guidance on online booking verification, temple dress code, VIP queue navigation, and historical stories of Ujjain Simhasth Kumbh.",
            price=1200.0,
            location="Ujjain",
            images=[
                "https://images.unsplash.com/photo-1609946682042-870e6728416b?w=800"
            ],
            available_dates=dates_next_7
        )

        s3 = Service(
            vendor_id=v2.id,
            title="Varanasi Sunrise Sunrise Boat & Ghat Pilgrimage Tour",
            category="guide",
            description="2.5 hour morning wooden boat ride from Dashashwamedh Ghat to Manikarnika Ghat with authentic Vedic chants and heritage story narration.",
            price=1500.0,
            location="Varanasi",
            images=[
                "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800",
                "https://images.unsplash.com/photo-1571536802807-30451e3955d8?w=800"
            ],
            available_dates=dates_next_14
        )

        s4 = Service(
            vendor_id=v3.id,
            title="Authentic Kutchi Mirrorwork & Embroidery Live Workshop",
            category="artisan",
            description="3-hour hands-on artisan masterclass. Learn original Kutchi embroidery stitches and take home your own handcrafted souvenir kit.",
            price=950.0,
            location="Bhuj",
            images=[
                "https://images.unsplash.com/photo-1606744888344-49423b812d02?w=800"
            ],
            available_dates=dates_next_7
        )

        s5 = Service(
            vendor_id=v4.id,
            title="Solang Valley & Secret Waterfall Guided Eco Trek",
            category="package",
            description="Full day trek through pine forests, apple orchards, ending at a hidden waterfall with freshly cooked local Himachali Siddu lunch.",
            price=2200.0,
            location="Manali",
            images=[
                "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800"
            ],
            available_dates=dates_next_14
        )

        db.add_all([s1, s2, s3, s4, s5])
        db.commit()

        print("📅 Creating Sample Bookings & Authentic Verified Reviews...")

        # Booking 1 (Completed -> Reviewed)
        b1 = Booking(
            service_id=s1.id,
            customer_name="Priya Patel",
            customer_phone="+919898989898",
            customer_email="priya.patel@gmail.com",
            booking_date=dates_next_14[0],
            status="completed",
            payment_status="paid"
        )

        # Booking 2 (Completed -> Reviewed)
        b2 = Booking(
            service_id=s3.id,
            customer_name="Rohit Verma",
            customer_phone="+919797979797",
            customer_email="rohit.v@yahoo.com",
            booking_date=dates_next_14[1],
            status="completed",
            payment_status="paid"
        )

        # Booking 3 (Confirmed -> Pending Completion)
        b3 = Booking(
            service_id=s2.id,
            customer_name="Amit Kumar",
            customer_phone="+919696969696",
            customer_email="amit.k@gmail.com",
            booking_date=dates_next_7[2],
            status="confirmed",
            payment_status="pending"
        )

        db.add_all([b1, b2, b3])
        db.commit()

        # Create Reviews for Completed Bookings (BR-05 & BR-06)
        r1 = Review(
            booking_id=b1.id,
            rating=5,
            comment="Unmatched hospitality by Ramesh ji! Extremely clean room right near Mahakaleshwar temple. The home-cooked breakfast was delicious."
        )

        r2 = Review(
            booking_id=b2.id,
            rating=5,
            comment="Pandit Anand Shastri made our Varanasi trip unforgettable. His depth of knowledge about the ancient ghats gave us deep spiritual peace."
        )

        db.add_all([r1, r2])
        db.commit()

        print("✅ Database successfully seeded with authentic BharatSetu prototype data!")
        print("Vendor Logins for Testing:")
        print("1. Ramesh Sharma (Ujjain): ramesh@ujjainhomestay.in / vendor123")
        print("2. Pandit Anand Shastri (Varanasi): anand@varanasiguides.com / vendor123")
        print("3. Sunita Devi (Kutch Artisan): sunita@kutchartisan.org / vendor123")
        print("4. Vikram Negi (Manali Trekking): vikram@himalayanecotreks.com / vendor123")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
