import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.html',
  styleUrls: ['./asignaciones.scss'],
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule]
})
export class Asignaciones implements OnInit {
  asignaciones: any[] = [];
  // Añadimos los campos que aparecen en el modal
  nuevaAsignacion = { 
    id_mecanico: '', 
    id_vehiculo: '', 
    descripcion: '', 
    estado: '' 
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarAsignaciones();
  }

  cargarAsignaciones() {
    this.http.get<any[]>('http://localhost:8000/asignaciones')
      .subscribe(data => this.asignaciones = data);
  }

  agregarAsignacion() {
    if (!this.nuevaAsignacion.id_mecanico || !this.nuevaAsignacion.id_vehiculo) {
      alert('Completa los campos de ID Mecánico y Vehículo');
      return;
    }

    this.http.post('http://localhost:8000/asignaciones', this.nuevaAsignacion)
      .subscribe(() => {
        this.cargarAsignaciones();
        // Reiniciamos todos los campos
        this.nuevaAsignacion = { id_mecanico: '', id_vehiculo: '', descripcion: '', estado: '' };
      });
  }
  
}
