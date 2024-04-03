import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera3',
  templateUrl: './cabecera3.component.html',
  styleUrls: ['./cabecera3.component.css']
})
export class Cabecera3Component {
  constructor(private router: Router) {}

  isInicioPage(): boolean {
    return this.router.url === '/paginareservas';
  }

  isReservarPage(): boolean {
    return this.router.url === '/paginadisponibilidad';
  }
  mostrarContactenos: boolean = false; // Define la propiedad mostrarContactenos y establece su valor inicial

    // Función para cerrar sesión
    cerrarSesion(): boolean {
      // Coloca aquí la lógica para cerrar sesión
      return this.router.url === '/paginalogin';
      console.log('Cerrando sesión...');
    }

      // Función para recuperar la clave
    recuperarClave(): void {
      // Coloca aquí la lógica para recuperar la clave
      console.log('Recuperando clave...');
    }

    toggleContactenos() {
      this.mostrarContactenos = !this.mostrarContactenos;
    }

    cerrarContactenos() {
      this.mostrarContactenos = false; // Aquí se cierra la sección de Contáctenos
    }

}
