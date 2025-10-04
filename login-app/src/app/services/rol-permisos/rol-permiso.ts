import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolPermisoService {

  private apiUrl = 'http://localhost:3000/api/rol-permiso';

  constructor(private http: HttpClient) {}

  obtenerRolPermisos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerRolPermisosPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  asigarPermiso(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  actualizarRolPermiso(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  eliminarRolPermisos(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
