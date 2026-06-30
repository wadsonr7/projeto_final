import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // 👈 Mudado de 'App' para 'AppComponent'

bootstrapApplication(AppComponent, appConfig) // 👈 Mudado aqui também
  .catch((err) => console.error(err));
