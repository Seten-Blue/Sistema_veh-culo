import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asignaciones',
  templateUrl: './asignaciones.html',
  styleUrls: ['./asignaciones.scss']
})
export class Asignaciones implements OnInit {
  asignaciones: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerAsignaciones();
  }

  obtenerAsignaciones() {
    this.http.get('http://localhost:8000/asignaciones').subscribe({
      next: (data: any) => this.asignaciones = data,
      error: (err) => console.error('Error cargando asignaciones', err)
    });
  }
}
