import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public myForm!: FormGroup;
  public incorrectCredentials: boolean = false; // Agrega la propiedad incorrectCredentials

  constructor(private fb: FormBuilder, private loginPro: AuthService) {}

  ngOnInit(): void {
    this.myForm = this.createMyForm();
  }

  private createMyForm(): FormGroup {
    return this.fb.group({
      usuario: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  public submitFormulario() {
    if (this.myForm.invalid) {
      Object.values(this.myForm.controls).forEach(control => {
        control.markAllAsTouched();
      });
      return;
    }

    if (!this.loginPro.ingresarAplicacion(this.myForm.value)) {
      this.incorrectCredentials = true; // Establece incorrectCredentials a true si el inicio de sesión falla
      return; // Detén la función si las credenciales son incorrectas
    }

    console.log(this.myForm.value);
  }

  public get f(): any {
    return this.myForm.controls;
  }
}
