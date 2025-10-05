import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auths/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  correo = '';
  clave = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Funcion encargada de iniciar sesion
  iniciarSesion(){
    // Se llama al servicio para utilizar su funcionalidad (Ctrl + click en iniciarSesion)
    this.authService.iniciarSesion(this.correo, this.clave).subscribe({
      // El next sirve para manejar las respuestas exitosas de la funcion
      next: () => {
        // Se obtiene el usuario logueado
        const usuario = this.authService.obtenerUsuario();

        //Aqui decides a donde va el usuario
        if (usuario.rol === 'Administrador') {
          this.router.navigate(['/usuarios']); // Panel admin
        }else {
          this.router.navigate(['/inicio']); // Pagina normal
        }
      },
      error: err => {
        alert('Credenciales incorrectas');
      }
    });
  }

}
