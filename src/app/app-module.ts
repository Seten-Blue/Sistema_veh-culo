import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';  // Tu archivo app.ts

// 🔹 Importa los componentes según tu estructura real
import { Vehiculos } from './componentes/vehiculos/vehiculos';
import { Mecanicos } from './componentes/mecanicos/mecanicos';
import { Asignaciones } from './componentes/asignaciones/asignaciones';

@NgModule({
  declarations: [
    App  // Solo el componente principal va aquí
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    Vehiculos,       // 🔹 Componentes standalone van en imports
    Mecanicos,
    Asignaciones
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
