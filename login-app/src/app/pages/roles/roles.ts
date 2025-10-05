import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService } from '../../services/roles/roles';
import { PermisosService } from '../../services/permisos/permisos';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './roles.html',
  styleUrls: ['./roles.css']
})
export class RolesComponent {
  // Variables para manejar los roles y permisos
  roles: any[] = [];
  permisosDisponibles: any[] = [];

  mostrarModal = false;
  esEdicion = false;

  rolSeleccionado: any = {
    id_rol: null,
    nombre: '',
    permisos: []
  };

  // Se inyectan los servicios que se ocuparan
  constructor(
    private rolesService: RolesService,
    private permisosService: PermisosService
  ) {}

  // Sirve para inicializar el componente, son funciones que siempre estan activas
  ngOnInit() {
    this.cargarRoles();
    this.cargarPermisos();
  }

  // Funcion para cargar los roles
  cargarRoles() {
    this.rolesService.obtenerRoles().subscribe({
      next: (data) => this.roles = data,
      error: (err) => console.error('Error al obtener roles', err)
    });
  }

  // Funcion para cargar los permisos
  cargarPermisos() {
    this.permisosService.obtenerPermisos().subscribe({
      next: (data) => this.permisosDisponibles = data,
      error: (err) => console.error('Error al obtener permisos', err)
    });
  }

  // Funcion para abrir el modal de crear rol
  abrirModalCrear() {
    this.esEdicion = false;
    this.rolSeleccionado = { id_rol: null, nombre: '', permisos: [] };
    this.mostrarModal = true;
  }

  // Funcion para abrir el modal de editar rol
  abrirModalEditar(rol: any) {
    this.rolesService.obtenerRolPorId(rol.id_rol).subscribe({
      next: (data) => {
        // Respuesta exitosa
        this.esEdicion = true;
        this.rolSeleccionado = {
          id_rol: data.id_rol,
          nombre: data.nombre,
          permisos: data.permisos.map((p: any) => p.id_permiso)
        };
        this.mostrarModal = true;
      },
      error: (err) => console.error('Error al cargar rol', err)
    });
  }

  // Funcion para cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
  }

  // Funcion para agregar o quitar permisos del rol seleccionado
  togglePermiso(idPermiso: number) {
    const index = this.rolSeleccionado.permisos.indexOf(idPermiso);
    if (index > -1) {
      this.rolSeleccionado.permisos.splice(index, 1);
    } else {
      this.rolSeleccionado.permisos.push(idPermiso);
    }
  }

  // Funcion para guardar los cambios del rol (crear o editar)
  guardarCambios() {
    if (this.esEdicion) {
      this.rolesService.actualizarRol(this.rolSeleccionado.id_rol, this.rolSeleccionado).subscribe({
        next: () => {
          this.cargarRoles();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al actualizar rol', err)
      });
    } else {
      this.rolesService.agregarRol(this.rolSeleccionado).subscribe({
        next: () => {
          this.cargarRoles();
          this.cerrarModal();
        },
        error: (err) => console.error('Error al crear rol', err)
      });
    }
  }

  // Funcion para eliminar un rol
  eliminarRol(id: number) {
    if (confirm('¿Seguro que deseas eliminar este rol?')) {
      this.rolesService.eliminarRol(id).subscribe({
        next: () => this.cargarRoles(),
        error: (err) => console.error('Error al eliminar rol', err)
      });
    }
  }
}
