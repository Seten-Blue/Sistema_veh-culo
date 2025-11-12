import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Vehiculos } from './componentes/vehiculos/vehiculos';
import { Mecanicos } from './componentes/mecanicos/mecanicos';
import { Asignaciones } from './componentes/asignaciones/asignaciones';

import { VehiculosService } from './servicios/vehiculos';
import { MecanicosService } from './servicios/mecanicos';
import { AsignacionesService } from './servicios/asignaciones';

declare var bootstrap: any;

// ==========================
// INTERFACES
// ==========================
interface Vehiculo {
  marca: string;
  modelo: string;
  anio: string;
  kilometraje: string;
  tipo_combustible: string;
  caballos: string;
  torque: string;
  segmento: string;
}

interface Mecanico {
  nombre: string;
  apellido: string;
}

interface Asignacion {
  id_mecanico: string;
  id_vehiculo: string;
  descripcion: string;
  estado: string;
}

// ==========================
// COMPONENTE
// ==========================
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, Vehiculos, Mecanicos, Asignaciones]
})
export class AppComponent implements AfterViewInit {
  titulo = 'Dashboard Vehículos y Mecánicos';

  // Objetos inicializados con todos los campos
  nuevoVehiculo: Vehiculo = {
    marca: '',
    modelo: '',
    anio: '',
    kilometraje: '',
    tipo_combustible: '',
    caballos: '',
    torque: '',
    segmento: ''
  };

  nuevoMecanico: Mecanico = {
    nombre: '',
    apellido: ''
  };

  nuevaAsignacion: Asignacion = {
    id_mecanico: '',
    id_vehiculo: '',
    descripcion: '',
    estado: 'pendiente'
  };

  // Referencias a los modales
  @ViewChild('modalVehiculo') modalVehiculo!: ElementRef;
  @ViewChild('modalMecanico') modalMecanico!: ElementRef;
  @ViewChild('modalAsignacion') modalAsignacion!: ElementRef;

  private bootstrapModalVehiculo: any;
  private bootstrapModalMecanico: any;
  private bootstrapModalAsignacion: any;

  constructor(
    private vehiculosService: VehiculosService,
    private mecanicosService: MecanicosService,
    private asignacionesService: AsignacionesService
  ) {}

  ngAfterViewInit(): void {
    // Inicializa los modales de Bootstrap
    this.bootstrapModalVehiculo = new bootstrap.Modal(this.modalVehiculo.nativeElement, { backdrop: 'static', keyboard: true });
    this.bootstrapModalMecanico = new bootstrap.Modal(this.modalMecanico.nativeElement, { backdrop: 'static', keyboard: true });
    this.bootstrapModalAsignacion = new bootstrap.Modal(this.modalAsignacion.nativeElement, { backdrop: 'static', keyboard: true });
  }

  // ==========================
  // FUNCIONES DE MODAL
  // ==========================
  abrirModal(modal: string) {
    if (modal === 'vehiculo') this.bootstrapModalVehiculo.show();
    if (modal === 'mecanico') this.bootstrapModalMecanico.show();
    if (modal === 'asignacion') this.bootstrapModalAsignacion.show();
  }

  cerrarModal(modal: string) {
    if (modal === 'vehiculo') this.bootstrapModalVehiculo.hide();
    if (modal === 'mecanico') this.bootstrapModalMecanico.hide();
    if (modal === 'asignacion') this.bootstrapModalAsignacion.hide();
  }

  // ==========================
  // FUNCIONES AGREGAR
  // ==========================
  agregarVehiculo() {
    if (!this.nuevoVehiculo.marca || !this.nuevoVehiculo.modelo || !this.nuevoVehiculo.anio ||
        !this.nuevoVehiculo.kilometraje || !this.nuevoVehiculo.tipo_combustible ||
        !this.nuevoVehiculo.caballos || !this.nuevoVehiculo.torque || !this.nuevoVehiculo.segmento) {
      alert('Completa todos los campos del vehículo');
      return;
    }
    this.vehiculosService.crearVehiculo(this.nuevoVehiculo).subscribe(() => {
      alert('Vehículo agregado exitosamente');
      this.nuevoVehiculo = {
        marca: '', modelo: '', anio: '',
        kilometraje: '', tipo_combustible: '',
        caballos: '', torque: '', segmento: ''
      };
      this.cerrarModal('vehiculo');
    });
  }

  agregarMecanico() {
    if (!this.nuevoMecanico.nombre || !this.nuevoMecanico.apellido) {
      alert('Completa todos los campos del mecánico');
      return;
    }
    this.mecanicosService.agregarMecanico(this.nuevoMecanico).subscribe(() => {
      alert('Mecánico agregado exitosamente');
      this.nuevoMecanico = { nombre: '', apellido: '' };
      this.cerrarModal('mecanico');
    });
  }

  agregarAsignacion() {
    if (!this.nuevaAsignacion.id_mecanico || !this.nuevaAsignacion.id_vehiculo ||
        !this.nuevaAsignacion.descripcion || !this.nuevaAsignacion.estado) {
      alert('Completa todos los campos de asignación');
      return;
    }
    this.asignacionesService.agregarAsignacion(this.nuevaAsignacion).subscribe(() => {
      alert('Asignación agregada exitosamente');
      this.nuevaAsignacion = { id_mecanico: '', id_vehiculo: '', descripcion: '', estado: 'pendiente' };
      this.cerrarModal('asignacion');
    });
  }
}
