import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Bebidas } from '../models/bebidas';

@Injectable({
  providedIn: 'root'
})
export class ServicioBebidaService {

  private urlBase = "http://localhost/api/";

  constructor(private http: HttpClient) { }

  // Obtener todas las bebidas
  public getBebidas(): Observable<any> {
    return this.http.get(this.urlBase + "bebidas").pipe(
      catchError(this.handleError)
    );
  }

  // Buscar una bebida por ID
  public buscarBebida(bebidaId: string): Observable<any> {
    return this.http.get(this.urlBase + "bebidas/" + bebidaId).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar una bebida por ID
  public eliminarBebida(bebidaId: string): Observable<any> {
    return this.http.delete(this.urlBase + 'bebidas/' + bebidaId).pipe(
      catchError(this.handleError)
    );
  }

  // Modificar una bebida por ID
  public modificarBebida(bebidaId: string, bebida: Bebidas): Observable<any> {
    let params = JSON.stringify(bebida);
    let headersUpdate = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.put(this.urlBase + 'bebidas/' + bebidaId, params, { headers: headersUpdate }).pipe(
      catchError(this.handleError)
    );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // El backend retornó un código de error
      console.error(`Código de error ${error.status}, ` + `Error: ${error.error}`);
    }
    return throwError('Algo malo sucedió; por favor, inténtalo de nuevo más tarde.');
  }

  
}
