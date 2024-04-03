import { Injectable } from "@angular/core";
import { Registro } from "../models/registro";
import { HttpClient, HttpClientModule, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


export var urlBase = "http://localhost/api/";

@Injectable()
export class RegistroService {
  registro = {
    name: '',
    apellido: '',
    cellphone: '',
    email: '',
    password: ''
  };
  constructor(private http: HttpClient) {}


  public registrarUsuario(registro: Registro): Observable<any> {
    let params = JSON.stringify(registro); // Convierte el objeto evento a una cadena JSON
    let headersCreate = new HttpHeaders().set('Content-Type', 'applicacion/json');

    // Realiza la solicitud HTTP POST con los datos en el cuerpo de la solicitud
    return this.http.post(urlBase + 'users', params, { headers: headersCreate });

  }
}
