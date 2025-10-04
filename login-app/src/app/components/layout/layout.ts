import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auths/auth';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  usuario: any;

  // Se inyecta el servicio Athservices y Router
  constructor(private auth:  AuthService, private router: Router) {
    this.usuario = this.auth.obtenerUsuario(); // Obtiene el usuario guardado en el localstorage
  }

  cerrarSesion() {
    this.auth.cerrarSesion();
    this.router.navigate(['/login']); // Redirige al login al cerrar sesion
  }
}
