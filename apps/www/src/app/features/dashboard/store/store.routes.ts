import type { Routes } from '@angular/router';

export const STORE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/main.component').then((c) => c.MainComponent),
  },
  {
    path: 'customization',
    loadComponent: () =>
      import('./pages/customization.component').then(
        (c) => c.CustomizationComponent,
      ),
  },
];
