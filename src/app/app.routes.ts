import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth/auth.guard';
import { userLoggedGuard } from './guard/auth/userLogged.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/public/login/login.page').then((m) => m.LoginPage),
    // canActivate: [userLoggedGuard],
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/public/register/register.page').then(
        (m) => m.RegisterPage
      ),
    // canActivate: [userLoggedGuard],
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./pages/private/app/app.page').then((m) => m.AppPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'config',
    loadComponent: () =>
      import('./pages/private/config/config.page').then((m) => m.ConfigPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'calendar',
    loadComponent: () =>
      import('./pages/private/calendar/calendar.page').then(
        (m) => m.CalendarPage
      ),
    canActivate: [AuthGuard],
  },
];
