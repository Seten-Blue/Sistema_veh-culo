from sqlalchemy import Column, Integer, String
from app.database import Base

class Vehiculo(Base):
    __tablename__ = "vehiculos"

    id = Column(Integer, primary_key=True, index=True)
    marca = Column(String(50), nullable=False)
    modelo = Column(String(50), nullable=False)
    kilometraje = Column(String(50), default="<Información no brindada por la marca>")
    tipo_combustible = Column(String(50), default="<Información no brindada por la marca>")
    caballos = Column(String(50), default="<Información no brindada por la marca>")
    torque = Column(String(50), default="<Información no brindada por la marca>")
    segmento = Column(String(50), default="<Información no brindada por la marca>")

class Mecanico(Base):
    __tablename__ = "mecanicos"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50), nullable=False)
    apellido = Column(String(50), nullable=False)
