import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { map } from 'rxjs';

import { ConfigService } from '~core/services/config.service';
import type { Product } from '~core/models/product.model';
import type { Category } from '~core/models/category.model';

export const categoryResolver: ResolveFn<{
  billboard: Category;
  products: Product[];
}> = (route: ActivatedRouteSnapshot) => {
  return inject(ConfigService).config$.pipe(
    map((config) => ({
      billboard:
        config?.categories.find(
          (category) => category.slug === route.paramMap.get('category'),
        ) || ({} as Category),
      products:
        config?.products.filter(
          (product) =>
            product.category.toLowerCase() === route.paramMap.get('category'),
        ) || [],
    })),
  );
};
