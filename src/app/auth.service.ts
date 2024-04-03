import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private ingresar:boolean= false;
private _isAuthenticated = false;
 get isAuthenticated(): boolean {
  return this._isAuthenticated;

 }
 login(){
  this._isAuthenticated =true;
 }
 logout(){
  this._isAuthenticated = false;
 }

  constructor(private router: Router) { }

  public ingresarAplicacion(obj:any):boolean{
   this.ingresar=obj.usuario=='prueba@gmail.com' && obj.password=='12345678';
   if(this.ingresar)
   {
    this.router.navigate(['/paginareservas']);
   }
    return this.ingresar;

  }
  public habilitarlogeo(){
    const estaEnRutaNavegacion = this.router.url === '/navegacion';


    return this.ingresar && estaEnRutaNavegacion;
   //return this.ingresar;
  }


}
