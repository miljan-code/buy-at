import { Routes } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';
import { DashboardGuard } from '~shared/guards/dashboard.guard';

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
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/dashboard/stores/stores.component').then(
            (c) => c.StoresComponent,
          ),
        canActivate: [DashboardGuard],
      },
      {
        path: 'store/new',
        loadComponent: () =>
          import(
            './features/dashboard/create-store/create-store.component'
          ).then((c) => c.CreateStoreComponent),
      },
      {
        path: 'store/:slug',
        loadComponent: () =>
          import('./features/dashboard/store/store.component').then(
            (c) => c.StoreComponent,
          ),
      },
    ],
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('./core/auth/auth.component').then((c) => c.AuthComponent),
  },
];
