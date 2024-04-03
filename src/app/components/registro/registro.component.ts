import { Component } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  providers: [RegistroService]
})
export class RegistroComponent {
  registro: any = {}; // Objeto para almacenar los datos del formulario
  registroExitoso: boolean = false; // Variable para mostrar la alerta de registro exitoso
  registroExistente: boolean = false; // Variable para mostrar la alerta de usuario existente

  constructor(private registroService: RegistroService, 
    private router: Router) { }

  submitRegistro(form: any): void {
    if (form.valid) {
      console.log('Formulario válido');
      console.log('Datos del registro:', this.registro);

      // Enviar los datos del registro al servicio para registrar al usuario
      this.registroService.registrarUsuario(this.registro).subscribe(
        response => {
          console.log('Respuesta del servidor:', response);
          if (response.statusCode === 200 && response.message === 'Success') {
            this.registroExitoso = true;
            this.registroExistente = false; // Reiniciar la variable
            setTimeout(() => {
              this.router.navigate(['/paginalogin']); // Redirigir a la página de inicio de sesión
            }, 3000);
          } else {
            this.registroExitoso = false;
            this.registroExistente = true;
            setTimeout(() => {
              this.registroExistente = false;
            }, 3000);
          }
        },
        error => {
          console.error('Error al registrar usuario:', error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );
    } else {
      console.error('Formulario inválido');
      // Aquí puedes manejar la lógica para mostrar mensajes de error o realizar otras acciones cuando el formulario sea inválido
    }
  }

  validateNumber(event: any): void {
    const keyCode = event.keyCode;
    if (!(keyCode >= 48 && keyCode <= 57)) {
      event.preventDefault(); // Bloquea la entrada si no es un número
    }
  }
}
