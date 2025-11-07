import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.html',
  styleUrls: ['./vehiculos.scss']
})
export class Vehiculos implements OnInit {
  vehiculos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerVehiculos();
  }

  obtenerVehiculos() {
    this.http.get('http://localhost:8000/vehiculos').subscribe({
      next: (data: any) => this.vehiculos = data,
      error: (err) => console.error('Error cargando vehículos', err)
    });
  }
}

