import type { Routes } from '@angular/router';

export const STORE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/main.component').then((c) => c.MainComponent),
  },
];
