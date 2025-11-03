from pydantic import BaseModel
from typing import Optional

# Vehículos
class VehiculoBase(BaseModel):
    marca: str
    modelo: str
    kilometraje: Optional[str] = "<Información no brindada por la marca>"
    tipo_combustible: Optional[str] = "<Información no brindada por la marca>"
    caballos: Optional[str] = "<Información no brindada por la marca>"
    torque: Optional[str] = "<Información no brindada por la marca>"
    segmento: Optional[str] = "<Información no brindada por la marca>"

class VehiculoCreate(VehiculoBase):
    pass

class VehiculoResponse(VehiculoBase):
    id: int
    class Config:
        from_attributes = True

# Mecánicos
class MecanicoBase(BaseModel):
    nombre: str
    apellido: str

class MecanicoCreate(MecanicoBase):
    pass

class MecanicoResponse(MecanicoBase):
    id: int
    class Config:
        from_attributes = True
