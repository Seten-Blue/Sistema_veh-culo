from fastapi import FastAPI, Depends, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Vehiculo, Mecanico, Base
from app.schemas import VehiculoCreate, VehiculoResponse, MecanicoCreate, MecanicoResponse
from typing import List
import os

# Crear tablas si no existen
Base.metadata.create_all(bind=engine)

app = FastAPI(title="API de Vehículos", version="1.0")

# Configurar templates
templates = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "templates"))

# Dependencia para sesión DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/", response_class=HTMLResponse)
async def inicio(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# --- VEHÍCULOS ---
@app.get("/vehiculos", response_model=List[VehiculoResponse])
def obtener_vehiculos(db: Session = Depends(get_db)):
    return db.query(Vehiculo).all()

@app.post("/vehiculos", response_model=VehiculoResponse)
def crear_vehiculo(v: VehiculoCreate, db: Session = Depends(get_db)):
    nuevo = Vehiculo(**v.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo

# --- MECÁNICOS ---
@app.get("/mecanicos", response_model=List[MecanicoResponse])
def obtener_mecanicos(db: Session = Depends(get_db)):
    return db.query(Mecanico).all()

@app.post("/mecanicos", response_model=MecanicoResponse)
def crear_mecanico(m: MecanicoCreate, db: Session = Depends(get_db)):
    nuevo = Mecanico(**m.dict())
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return nuevo
