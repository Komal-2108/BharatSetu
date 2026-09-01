# 🇮🇳 BharatSetu Backend (FastAPI + SQLAlchemy + Twilio WhatsApp)

Hyperlocal Travel & Local Service Booking Platform Backend MVP.

---

## 🌟 Architecture & Tech Stack

- **Framework:** FastAPI (Python 3.10+)
- **Database:** SQLAlchemy 2.0 ORM with dual SQLite / PostgreSQL (Supabase) support
- **Auth:** JWT (JSON Web Tokens) with passlib / bcrypt password hashing
- **Messaging Layer:** WhatsApp Notifications via Twilio REST API (Non-blocking DB persistence)
- **Storage:** Local disk static file serving + optional Supabase Storage integration
- **Testing:** Pytest & FastAPI TestClient with complete business rule assertions

---

## 📋 Features & Business Rules Implemented

| ID | Requirement / Rule | Implementation Summary |
|---|---|---|
| **FR-01** | Vendor Registration | `POST /api/v1/vendors/register` with business info, state, city & ID document |
| **FR-02** | Vendor Authentication | `POST /api/v1/vendors/login` issuing secure JWT tokens |
| **FR-03** | Service Creation | `POST /api/v1/services` (Authenticated vendors) |
| **FR-04** | Service Discovery | `GET /api/v1/services` with location, category, search, & price filters |
| **FR-06** | Service Details | `GET /api/v1/services/{id}` returning vendor profile, rating, and availability |
| **FR-07** | Customer Booking | `POST /api/v1/bookings` with customer details and date picker |
| **FR-08** | WhatsApp Delivery | Twilio WhatsApp alerts triggered for customer & vendor post DB commit |
| **FR-09** | Vendor Booking Inbox | `GET /api/v1/bookings/vendor/{vendor_id}` listing incoming bookings |
| **FR-10** | Status Management | `PATCH /api/v1/bookings/{id}/status` (`pending` -> `confirmed`/`completed`/`cancelled`) |
| **FR-11** | Verified Reviews | `POST /api/v1/bookings/{id}/review` (1-5 star ratings + comments) |
| **FR-13** | Verified Vendor Badge | `PATCH /api/v1/vendors/{id}/verify` admin simulation toggle |
| **FR-14** | Storage Management | `POST /api/v1/upload` for local static storage + Supabase Storage fallback |
| **BR-03** | Available Date Check | Prevents bookings on dates outside `service.available_dates` |
| **BR-05** | Completed Booking Reviews | Only bookings in `completed` status can receive reviews |
| **BR-06** | Unique Review Constraint | Prevents duplicate reviews for the same booking ID |
| **BR-07** | Rating Bounds | Enforces ratings strictly between 1 and 5 |
| **BR-08** | WhatsApp Non-blocking | Database commits BEFORE attempting WhatsApp sending; Twilio errors do not fail booking |
| **BR-09** | State Transition Safety | Prevents marking a `cancelled` booking as `completed` |

---

## 🚀 How to Run locally

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

### 3. Seed Database & Start Server

Run with automatic seed data generation:

```bash
python run.py --seed
```

Or start the uvicorn server directly:

```bash
uvicorn app.main:app --reload --port 8000
```

---

## 📖 API Documentation & Interactive Testing

Once running, access the interactive OpenAPI docs:

- **Swagger UI:** `http://localhost:8000/docs`
- **ReDoc UI:** `http://localhost:8000/redoc`

---

## 🧪 Running Automated Unit Tests

Execute the complete test suite covering all API endpoints and business rules:

```bash
pytest tests/ -v
```

---

## 🔑 Default Seed Vendor Accounts

| Vendor Name | Email | Password | City & Category |
|---|---|---|---|
| **Ramesh Sharma** | `ramesh@ujjainhomestay.in` | `vendor123` | Ujjain (Homestay / Guide) |
| **Pandit Anand Shastri** | `anand@varanasiguides.com` | `vendor123` | Varanasi (Heritage Guide) |
| **Sunita Devi** | `sunita@kutchartisan.org` | `vendor123` | Bhuj (Kutchi Artisan) |
| **Vikram Negi** | `vikram@himalayanecotreks.com` | `vendor123` | Manali (Eco Treks Operator) |

---

## 📱 WhatsApp Integration (Twilio Sandbox)

To enable live WhatsApp notifications:
1. Join the Twilio Sandbox for WhatsApp (text `join <sandbox-code>` to `+14155238886`).
2. Add your credentials in `.env`:
   ```env
   TWILIO_ACCOUNT_SID="ACxxxxxxxxxxxxxxxxxxxxxxxx"
   TWILIO_AUTH_TOKEN="your_auth_token"
   TWILIO_WHATSAPP_NUMBER="whatsapp:+14155238886"
   ```
3. If credentials are left blank, notifications will be cleanly simulated in server stdout logs without interrupting booking persistence.
