import { Routes } from '@angular/router';

import { categoryResolver } from '~shared/resolvers/category.resolver';
import { productResolver } from '~shared/resolvers/product.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'category/:category',
    loadComponent: () =>
      import('./features/category/category.component').then(
        (c) => c.CategoryComponent,
      ),
    resolve: {
      category: categoryResolver,
    },
  },
  {
    path: 'category/:category/:product',
    loadComponent: () =>
      import('./features/product/product.component').then(
        (c) => c.ProductComponent,
      ),
    resolve: {
      product: productResolver,
    },
  },
];
