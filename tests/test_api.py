from fastapi.testclient import TestClient
from app.main import app
client=TestClient(app)
def test_health(): assert client.get("/health").json()=={"status":"ok"}
def test_alert_lifecycle():
 r=client.post("/alerts",json={"service":"payments","message":"Checkout latency is high","severity":"high"}); assert r.status_code==201
 i=r.json()["id"]; assert client.post("/incidents/"+i+"/acknowledge").json()["status"]=="acknowledged"
def test_invalid_severity(): assert client.post("/alerts",json={"service":"api","message":"bad","severity":"urgent"}).status_code==422
