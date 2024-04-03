import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'canchatesis';
  constructor(private router: Router) {}

  mostrarComponentesComunes(): boolean {
    // Verifica si la ruta actual es diferente de '/registro' y '/paginalogin'
    return !this.router.url.includes('/paginaclientes') && !this.router.url.includes('/paginalogin') && !this.router.url.includes('/paginareservas') && !this.router.url.includes('/paginadisponibilidad');
  }

  isLoginPage(): boolean {
    return this.router.url === '/paginalogin';
  }

  isRegistroPage(): boolean {
    return this.router.url === '/paginaclientes';
  }

  isReservasPage(): boolean {
    return this.router.url === '/reservas';
  }

  isDisponibilidadPage(): boolean {
    return this.router.url === '/disponibilidad';
  }

}
