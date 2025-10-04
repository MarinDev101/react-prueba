import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private apiUrl = 'http://localhost:3000/api/roles';

  constructor(private http: HttpClient) {}

  obtenerRoles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerRolPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarRol(rol: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, rol);
  }

  actualizarRol(id: number, rol: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, rol);
  }

  eliminarRol(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
