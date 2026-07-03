import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { HomeComponent } from './home/home'; // Importe a Home
import { Dashboard } from './dashboard/dashboard';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }, // Rota da Ação 2
  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },
];
