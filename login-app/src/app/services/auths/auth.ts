import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // LOS SERVICES SIRVEN PARA HACER PETICIONES AL BACKEND

  private apiUrl = 'http://localhost:300/api/auth'; // Tu backend
  private claveToken = 'token'; //clave para almacenar el token en localstorage
  private claveUsuario = 'usuario' //Clave para almacenar el usuario en localstorage

  constructor(private http: HttpClient) {}

  iniciarSesion(correo: string, clave: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email: correo, password: clave}).pipe(
      tap(respuesta => {
        if (respuesta.token) {
          localStorage.setItem(this.claveToken, respuesta.token);
          localStorage.setItem(this.claveUsuario, JSON.stringify(respuesta.usuario));
        }
      })
    );
  }

  cerrarSesion() {
    localStorage.removeItem(this.claveToken);
    localStorage.removeItem(this.claveUsuario);
  }

  obtenerUsuario() {
    return JSON.parse(localStorage.getItem(this.claveUsuario) || 'null');
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem(this.claveToken);
  }

  obtenerRol(): string {
    const usuario = this.obtenerUsuario();
    return usuario?.rol || '';
  }

}
