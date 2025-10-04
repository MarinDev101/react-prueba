import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuariosService } from '../../../services/usuarios/usuarios';
import { RolesService } from '../../../services/roles/roles';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css'
})
export class UsuariosComponent {
  usuarios: any[] = [];
  roles: any[] = [];
  mostrarModal = false;
  modoEdicion = false;
  permisosRolSeleccionado: any[] = [];

  usuarioForm: any = {
    id_usuario: null,
    nombre: '',
    email: '',
    clave: '',
    id_rol: null
  };

  constructor(
    private usuariosService: UsuariosService,
    private rolesService: RolesService
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarRoles();
  }

  cargarUsuarios() {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err) => console.error('Error al obtener usuarios', err)
    });
  }

  cargarRoles() {
    this.rolesService.obtenerRoles().subscribe({
      next: (data) => (this.roles = data),
      error: (err) => console.error('Error al obtener roles', err)
    });
  }

  abrirModal(usuario: any = null) {
    if (usuario) {
      this.modoEdicion = true;
      this.usuarioForm = { ...usuario, clave: '' };
      this.cargarPermisos();
    } else {
      this.modoEdicion = false;
      this.usuarioForm = { id_usuario: null, nombre: '', email: '', clave: '', id_rol: null };
      this.permisosRolSeleccionado = [];
    }
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.usuarioForm = { id_usuario: null, nombre: '', email: '', clave: '', id_rol: null };
    this.permisosRolSeleccionado = [];
  }

  cargarPermisos() {
    if (!this.usuarioForm.id_rol) return;
    this.rolesService.obtenerRolPorId(this.usuarioForm.id_rol).subscribe({
      next: (rol) => {
        this.permisosRolSeleccionado = rol.permisos
          ? rol.permisos.map((p: any) => p.nombre)
          : [];
      },
      error: (err) => console.error('Error al cargar permisos del rol', err)
    });
  }

  registrarUsuario() {
    this.usuariosService.agregarUsuario(this.usuarioForm).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModal();
      },
      error: (err) => console.error('Error al registrar usuario', err)
    });
  }

  actualizarUsuario() {
    this.usuariosService.actualizarUsuario(this.usuarioForm.id_usuario, this.usuarioForm).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModal();
      },
      error: (err) => console.error('Error al actualizar usuario', err)
    });
  }

  eliminarUsuario() {
    if (!confirm(`¿Seguro que deseas eliminar a ${this.usuarioForm.nombre}?`)) return;

    this.usuariosService.eliminarUsuario(this.usuarioForm.id_usuario).subscribe({
      next: () => {
        this.cargarUsuarios();
        this.cerrarModal();
      },
      error: (err) => console.error('Error al eliminar usuario', err)
    });
  }
}
