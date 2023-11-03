import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { ProductService } from '~core/services/product.service';
import type { Product } from '~core/models/product.model';

export const productsResolver: ResolveFn<Product[]> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(ProductService).getProducts(
    route.parent?.paramMap.get('slug')!,
  );
};
