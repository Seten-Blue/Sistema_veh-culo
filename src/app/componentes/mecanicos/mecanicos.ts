import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mecanicos',
  templateUrl: './mecanicos.html',
  styleUrls: ['./mecanicos.scss']
})
export class Mecanicos implements OnInit {
  mecanicos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.obtenerMecanicos();
  }

  obtenerMecanicos() {
    this.http.get('http://localhost:8000/mecanicos').subscribe({
      next: (data: any) => this.mecanicos = data,
      error: (err) => console.error('Error cargando mecánicos', err)
    });
  }
}
