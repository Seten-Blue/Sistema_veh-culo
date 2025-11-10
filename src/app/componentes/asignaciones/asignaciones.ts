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
  nuevaAsignacion = { id_mecanico: '', id_vehiculo: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cargarAsignaciones();
  }

  cargarAsignaciones() {
    this.http.get<any[]>('http://localhost:8000/asignaciones')
      .subscribe(data => this.asignaciones = data);
  }

  agregarAsignacion() {
    this.http.post('http://localhost:8000/asignaciones', this.nuevaAsignacion)
      .subscribe(() => {
        this.cargarAsignaciones();
        this.nuevaAsignacion = { id_mecanico: '', id_vehiculo: '' };
      });
  }
}
