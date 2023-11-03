import type { Routes } from '@angular/router';

import { categoryResolver } from '~shared/resolvers/category.resolver';
import { productsResolver } from '~shared/resolvers/products.resolver';

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
  {
    path: 'products',
    loadComponent: () =>
      import('./pages/products.component').then((c) => c.ProductsComponent),
    resolve: {
      products: productsResolver,
    },
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./pages/categories.component').then((c) => c.CategoriesComponent),
    resolve: {
      categories: categoryResolver,
    },
  },
];
