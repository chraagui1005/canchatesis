import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routing';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CabeceraComponent } from './components/cabecera/cabecera.component';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { PieComponent } from './components/pie/pie.component';
import { RegistroComponent } from './components/registro/registro.component';
import { LoginComponent } from './components/login/login.component';
import { Cabecera2Component } from './components/cabecera2/cabecera2.component';
import { PaginaclientesComponent } from './components/paginaclientes/paginaclientes.component';
import { PaginaloginComponent } from './components/paginalogin/paginalogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Cabecera3Component } from './components/cabecera3/cabecera3.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { DisponibilidadComponent } from './components/disponibilidad/disponibilidad.component';
import { PaginadisponibilidadComponent } from './components/paginadisponibilidad/paginadisponibilidad.component';
import { PaginareservasComponent } from './components/paginareservas/paginareservas.component';
import { ActualizarReservaComponent } from './components/actualizar-reserva/actualizar-reserva.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CabeceraComponent,
    NavegacionComponent,
    PieComponent,
    RegistroComponent,
    LoginComponent,
    Cabecera2Component,
    PaginaclientesComponent,
    PaginaloginComponent,
    Cabecera3Component,
    ReservasComponent,
    DisponibilidadComponent,
    PaginadisponibilidadComponent,
    PaginareservasComponent,
    ActualizarReservaComponent
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
