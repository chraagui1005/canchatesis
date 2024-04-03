import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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

  public eliminarReserva(reservaId: string): Observable<any> {
    // Realizar la solicitud para eliminar la reserva con el ID dado
    return this.http.delete(this.urlBase + "reservas/" + reservaId);
  }
}
