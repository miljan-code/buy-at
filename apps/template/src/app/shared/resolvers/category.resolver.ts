import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { combineLatest, map } from 'rxjs';

import { ConfigService } from '~core/services/config.service';
import { ProductService } from '~core/services/product.service';
import type { Product } from '~core/models/product.model';
import type { Category } from '~core/models/category.model';

export const categoryResolver: ResolveFn<{
  billboard: Category;
  products: Product[];
}> = (route: ActivatedRouteSnapshot) => {
  return combineLatest([
    inject(ProductService).getProducts(route.paramMap.get('category')!),
    inject(ConfigService).config$,
  ]).pipe(
    map(([products, config]) => ({
      billboard:
        config?.categories.find(
          (category) => category.slug === route.paramMap.get('category'),
        ) || ({} as Category),
      products,
    })),
  );
};
