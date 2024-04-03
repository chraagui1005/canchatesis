import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "../models/login";

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  loginUsuario(login: Login): Observable<any> {
    // Convertir el objeto a JSON
    let body = JSON.stringify(login);
    // Establecer las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Realizar la solicitud POST
    return this.http.post('http://localhost/api/users', body, { headers: headers });
  }

  recoverPassword(email: string): Observable<any> {
    // Establecer las cabeceras
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    // Realizar la solicitud POST para recuperar la contraseña
    return this.http.post('http://localhost/api/recover-password', { email }, { headers: headers });
  }
}
