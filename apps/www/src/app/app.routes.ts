import { Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent,
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/auth/auth.component').then((c) => c.AuthComponent),
  },
];
