import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/public/register/register.page').then(
        (m) => m.RegisterPage
      ),
  },
  {
    path: 'app',
    loadComponent: () =>
      import('./pages/private/app/app.page').then((m) => m.AppPage),
  },
  {
    path: 'config',
    loadComponent: () =>
      import('./pages/private/config/config.page').then((m) => m.ConfigPage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/public/login/login.page').then((m) => m.LoginPage),
  },
];
