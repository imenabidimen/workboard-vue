from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from uuid import uuid4
app=FastAPI(title="SignalDesk",version="1.0.0")
incidents={}
class Alert(BaseModel):
 service:str=Field(min_length=2,max_length=80); message:str=Field(min_length=3,max_length=500); severity:str=Field(pattern="^(low|medium|high|critical)$")
@app.get("/health")
def health(): return {"status":"ok"}
@app.post("/alerts",status_code=201)
def ingest(alert:Alert):
 i={"id":str(uuid4()),**alert.model_dump(),"status":"open"}; incidents[i["id"]]=i; return i
@app.get("/incidents")
def list_incidents(): return list(incidents.values())
@app.post("/incidents/{incident_id}/acknowledge")
def acknowledge(incident_id:str):
 i=incidents.get(incident_id)
 if not i: raise HTTPException(404,"incident not found")
 i["status"]="acknowledged"; return i
