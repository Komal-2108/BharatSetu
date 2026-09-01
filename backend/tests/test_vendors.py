def test_register_and_login_vendor(client):
    # 1. Register vendor
    payload = {
        "name": "Mahakal Guide Service",
        "phone": "+919876543210",
        "email": "guide@ujjain.in",
        "password": "password123",
        "business_type": "guide",
        "city": "Ujjain",
        "state": "Madhya Pradesh",
        "description": "Expert temple guide",
        "id_doc_url": "http://localhost/doc.jpg",
        "language_pref": "hi"
    }
    response = client.post("/api/v1/vendors/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert "access_token" in data
    assert data["vendor"]["email"] == "guide@ujjain.in"
    assert data["vendor"]["verified"] is False

    # 2. Duplicate registration rejection
    dup_res = client.post("/api/v1/vendors/register", json=payload)
    assert dup_res.status_code == 400

    # 3. Login vendor
    login_res = client.post("/api/v1/vendors/login", json={
        "email": "guide@ujjain.in",
        "password": "password123"
    })
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]

    # 4. Get Current Vendor Profile
    me_res = client.get("/api/v1/vendors/me", headers={"Authorization": f"Bearer {token}"})
    assert me_res.status_code == 200
    assert me_res.json()["name"] == "Mahakal Guide Service"

    # 5. Toggle Verification Status
    v_id = data["vendor"]["id"]
    verify_res = client.patch(f"/api/v1/vendors/{v_id}/verify?verified=true")
    assert verify_res.status_code == 200
    assert verify_res.json()["verified"] is True
