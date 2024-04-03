import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PieComponent } from './components/pie/pie.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { Cabecera2Component } from './components/cabecera2/cabecera2.component';
import { PaginaclientesComponent } from './components/paginaclientes/paginaclientes.component';
import { PaginaloginComponent } from './components/paginalogin/paginalogin.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';
import { PaginareservasComponent } from './components/paginareservas/paginareservas.component';
import { PaginadisponibilidadComponent } from './components/paginadisponibilidad/paginadisponibilidad.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, // Ruta por defecto redirige a la página de inicio
  { path: 'inicio', component: InicioComponent },
  { path: 'login', component: LoginComponent }, // Agrega la ruta para el componente de login
  { path: 'registro', component: RegistroComponent }, // Agrega la ruta para el componente de registro
  { path: 'paginalogin', component: PaginaloginComponent },
  { path: 'paginaclientes', component: PaginaclientesComponent },
  { path: 'paginareservas', component: PaginareservasComponent },
  { path: 'paginadisponibilidad', component: PaginadisponibilidadComponent },

];
export const routing: ModuleWithProviders<Object> = RouterModule.forRoot(appRoutes);
