import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera2',
  templateUrl: './cabecera2.component.html',
  styleUrls: ['./cabecera2.component.css']
})
export class Cabecera2Component {
  constructor(private router: Router) {}

  isLoginPage(): boolean {
    return this.router.url === '/paginalogin';
  }

  isRegistroPage(): boolean {
    return this.router.url === '/paginaclientes';
  }
}
