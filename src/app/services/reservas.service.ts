import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Reservas } from "../models/reservas";

@Injectable({
  providedIn: 'root'
})
export class ReservasService {

  private urlBase = "http://localhost/api/"; // URL base de la API

  constructor(private http: HttpClient) {}

  public getReservas(): Observable<any> {
    // Realizar la consulta para obtener las reservas con correo electrónico igual a prueba@gmail.com
    return this.http.get(this.urlBase + "reservas/prueba@gmail.com");
  }

  public eliminarReserva2(reservaId: string): Observable<any> {
    // Realizar la solicitud para eliminar la reserva con el ID dado
    return this.http.delete(this.urlBase + "reservas/" + reservaId);
}

    // Modificar una bebida por ID
    public modificarReserva(reservaId: number, reservas: Reservas): Observable<any> {
      let params = JSON.stringify(reservas);
      let headersUpdate = new HttpHeaders().set('Content-Type', 'applicacion/json');
      return this.http.put(this.urlBase + 'reservas/' + reservaId, params, { headers: headersUpdate }).pipe(
      );
    }

        //AGREGAR INFORMACION A LA BASE:

        public agregarReserva(reservas: Reservas): Observable<any> {
          let params = JSON.stringify(reservas); // Convierte el objeto evento a una cadena JSON
          let headersCreate = new HttpHeaders().set('Content-Type', 'applicacion/json');

          // Realiza la solicitud HTTP POST con los datos en el cuerpo de la solicitud
          return this.http.post(this.urlBase + 'reservas', params, { headers: headersCreate });

        }
}
