import { Routes } from '@angular/router';
import { Layout } from './components/layout/layout';
import { authGuard } from './guard/guard'; // Importamos el guard

export const routes: Routes = [
  // Ruta publica para iniciar sesion
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then(m => m.LoginComponent) // carga standalone del login
  },
  // Rutas protegidas por el guard
  {
    path: '', //Ruta raiz
    component: Layout, //Todas las paginas estaran dentro del componente layout
    canActivate: [authGuard], //Protejemos las rutas hijas con el guard
    children: [ // Se definen las rutas hijas
      { //Cuando se entre a una ruta ejemplo: http://localhost:4200/usuarios se cargara el componente usuarios
        path: 'usuarios',
        loadComponent: () =>
          import('./pages/usuarios/usuarios').then(m => m.UsuariosComponent) // Metodo standalone para cargar los componentes dinamicamente sin necesidad de modulos
      },
      // Cuando se entre a una ruta ejemplo: http://localhost:4200/roles se cargara el componente roles
      {
        path: 'roles',
        loadComponent: () =>
          import('./pages/roles/roles').then(m => m.RolesComponent) // Metodo standalone para cargar los componentes dinamicamente sin necesidad de modulos
      },
      // si la ruta es vacia lo redirige a usuarios y debe ser la ruta exacta sino da error
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' }
    ]
  },
  {
    path: 'inicio',
    loadComponent: () =>
      import('./pages/pagina/pagina').then(m => m.InicioComponent) // Metodo standalone para cargar los componentes dinamicamente sin necesidad de modulos
  },
  // Cualquier ruta no encontrada redirige a login
  { path: '**', redirectTo: 'login' }
];
