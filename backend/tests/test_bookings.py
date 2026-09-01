def test_booking_flow_and_business_rules(client):
    # 1. Setup Vendor & Service
    reg_res = client.post("/api/v1/vendors/register", json={
        "name": "Local Tour Operator",
        "phone": "+919988776655",
        "email": "operator@manali.com",
        "password": "password123",
        "business_type": "package",
        "city": "Manali",
        "state": "Himachal Pradesh"
    })
    vendor_id = reg_res.json()["vendor"]["id"]
    token = reg_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    srv_res = client.post("/api/v1/services", json={
        "title": "Solang Valley Trek",
        "category": "package",
        "description": "Eco trek",
        "price": 1500.0,
        "location": "Manali",
        "images": [],
        "available_dates": ["2026-09-15", "2026-09-16"]
    }, headers=headers)
    service_id = srv_res.json()["id"]

    # 2. BR-03: Attempt booking for unavailable date (Should Fail with HTTP 400)
    invalid_date_res = client.post("/api/v1/bookings", json={
        "service_id": service_id,
        "customer_name": "Rohan",
        "customer_phone": "+919111111111",
        "customer_email": "rohan@test.com",
        "booking_date": "2026-09-20"  # Unavailable date
    })
    assert invalid_date_res.status_code == 400
    assert "not in the available dates list" in invalid_date_res.json()["detail"]

    # 3. Create Valid Booking (BR-08: Persistence & WhatsApp mock)
    valid_booking_res = client.post("/api/v1/bookings", json={
        "service_id": service_id,
        "customer_name": "Rohan",
        "customer_phone": "+919111111111",
        "customer_email": "rohan@test.com",
        "booking_date": "2026-09-15"
    })
    assert valid_booking_res.status_code == 201
    booking_data = valid_booking_res.json()
    booking_id = booking_data["id"]
    assert booking_data["status"] == "pending"

    # 4. BR-05: Attempt Review on Pending Booking (Should Fail)
    review_fail = client.post(f"/api/v1/bookings/{booking_id}/review", json={
        "rating": 5,
        "comment": "Too early review"
    })
    assert review_fail.status_code == 400
    assert "BR-05" in review_fail.json()["detail"]

    # 5. Vendor Inbox Check
    inbox_res = client.get(f"/api/v1/bookings/vendor/{vendor_id}")
    assert inbox_res.status_code == 200
    assert len(inbox_res.json()) == 1

    # 6. Vendor Status Update -> Confirmed -> Completed
    confirm_res = client.patch(f"/api/v1/bookings/{booking_id}/status", json={"status": "confirmed"})
    assert confirm_res.status_code == 200
    assert confirm_res.json()["status"] == "confirmed"

    complete_res = client.patch(f"/api/v1/bookings/{booking_id}/status", json={"status": "completed"})
    assert complete_res.status_code == 200
    assert complete_res.json()["status"] == "completed"

    # 7. Submit Authentic Review on Completed Booking
    review_success = client.post(f"/api/v1/bookings/{booking_id}/review", json={
        "rating": 5,
        "comment": "Outstanding trekking experience! Guide was super friendly."
    })
    assert review_success.status_code == 201
    assert review_success.json()["rating"] == 5

    # 8. BR-06: Attempt Duplicate Review on same booking (Should Fail)
    dup_review_res = client.post(f"/api/v1/bookings/{booking_id}/review", json={
        "rating": 4,
        "comment": "Second review attempt"
    })
    assert dup_review_res.status_code == 400
    assert "BR-06" in dup_review_res.json()["detail"]

def test_br09_cancelled_cannot_be_completed(client):
    # Setup service & booking
    reg_res = client.post("/api/v1/vendors/register", json={
        "name": "Goa Water Sports",
        "phone": "+919876543219",
        "email": "goa@watersports.com",
        "password": "password123",
        "business_type": "package",
        "city": "Goa",
        "state": "Goa"
    })
    token = reg_res.json()["access_token"]

    srv_res = client.post("/api/v1/services", json={
        "title": "Scuba Diving Ride",
        "category": "package",
        "description": "Scuba diving at Grand Island",
        "price": 3500.0,
        "location": "Goa",
        "available_dates": ["2026-09-25"]
    }, headers={"Authorization": f"Bearer {token}"})
    service_id = srv_res.json()["id"]

    booking_res = client.post("/api/v1/bookings", json={
        "service_id": service_id,
        "customer_name": "Karan",
        "customer_phone": "+919222222222",
        "customer_email": "karan@test.com",
        "booking_date": "2026-09-25"
    })
    booking_id = booking_res.json()["id"]

    # Cancel booking
    cancel_res = client.patch(f"/api/v1/bookings/{booking_id}/status", json={"status": "cancelled"})
    assert cancel_res.status_code == 200
    assert cancel_res.json()["status"] == "cancelled"

    # BR-09: Try marking cancelled booking as completed (Should Fail)
    invalid_comp = client.patch(f"/api/v1/bookings/{booking_id}/status", json={"status": "completed"})
    assert invalid_comp.status_code == 400
    assert "BR-09" in invalid_comp.json()["detail"]
