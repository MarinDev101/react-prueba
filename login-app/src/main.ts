import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';

bootstrapApplication(App, {
  // providers es un array de servicios que se inyectan en la aplicación sirven para configurar la aplicacion
  providers:[
  provideHttpClient(), // Servicio para hacer peticiones HTTP
  provideRouter(routes) // Servicio para configurar las rutas de la aplicación
]})
  .catch((err) => console.error(err));
