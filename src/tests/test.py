from fastapi.testclient import TestClient
import pytest
from src.server import app

client = TestClient(app)

def test_is_running():
    response = client.get("/is_running")
    assert response.status_code == 200
    assert response.json() == {"running": True}

# def test_get_athletes():
#     response = client.get("/athletes")
#     assert response.status_code == 200

# def test_get_judges():
#     response = client.get("/judges")
#     assert response.status_code == 200

# def test_get_matches():
#     response = client.get("/matches")
#     assert response.status_code == 200
