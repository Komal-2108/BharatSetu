def test_service_crud_and_filtering(client):
    # Register Vendor
    reg_res = client.post("/api/v1/vendors/register", json={
        "name": "Kashi Stays",
        "phone": "+919812345678",
        "email": "kashi@stays.com",
        "password": "password123",
        "business_type": "homestay",
        "city": "Varanasi",
        "state": "Uttar Pradesh"
    })
    token = reg_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Create Service
    service_payload = {
        "title": "Ganga Ghat Heritage Room",
        "category": "homestay",
        "description": "Beautiful room with balcony facing Dashashwamedh Ghat",
        "price": 2500.0,
        "location": "Varanasi",
        "images": ["http://localhost/ghat1.jpg"],
        "available_dates": ["2026-09-10", "2026-09-11"]
    }
    create_res = client.post("/api/v1/services", json=service_payload, headers=headers)
    assert create_res.status_code == 201
    service_id = create_res.json()["id"]

    # Search & Filter Services
    filter_res = client.get("/api/v1/services?location=Varanasi&category=homestay&max_price=3000")
    assert filter_res.status_code == 200
    services = filter_res.json()
    assert len(services) == 1
    assert services[0]["title"] == "Ganga Ghat Heritage Room"

    # Get Service Details
    detail_res = client.get(f"/api/v1/services/{service_id}")
    assert detail_res.status_code == 200
    assert detail_res.json()["vendor"]["name"] == "Kashi Stays"

    # Update Service
    update_res = client.patch(
        f"/api/v1/services/{service_id}",
        json={"price": 2200.0},
        headers=headers
    )
    assert update_res.status_code == 200
    assert update_res.json()["price"] == 2200.0
