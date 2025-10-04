import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  private apiUrl = 'http://localhost:300/api/permisos';

  constructor(private http: HttpClient) {}

  obtenerPermisos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  obtenerPermisoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  agregarPermiso(permiso: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, permiso);
  }

  actualizarPermiso(id: number, permiso: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, permiso);
  }

  eliminarPermiso(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
