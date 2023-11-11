import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { ProductService } from '~core/services/product.service';
import type { Product } from '~core/models/product.model';

export const productResolver: ResolveFn<Product> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(ProductService).getProduct(route.paramMap.get('product')!);
};
