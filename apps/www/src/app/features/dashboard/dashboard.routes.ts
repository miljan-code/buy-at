import type { Routes } from '@angular/router';

import { dashboardGuard } from '~shared/guards/dashboard.guard';
import { storeGuard } from '~shared/guards/store.guard';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./stores/stores.component').then((c) => c.StoresComponent),
    canActivate: [dashboardGuard],
  },
  {
    path: 'store',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'store/new',
    loadComponent: () =>
      import('./create-store/create-store.component').then(
        (c) => c.CreateStoreComponent,
      ),
  },
  {
    path: 'store/:slug',
    loadComponent: () =>
      import('./store/store.component').then((c) => c.StoreComponent),
    loadChildren: () =>
      import('./store/store.routes').then((s) => s.STORE_ROUTES),
    canActivate: [storeGuard],
  },
];
