import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

import { CategoryService } from '~core/services/category.service';
import type { Category } from '~core/models/categories.model';

export const categoryResolver: ResolveFn<Category[]> = (
  route: ActivatedRouteSnapshot,
) => {
  return inject(CategoryService).getCategories(
    route.parent?.paramMap.get('slug')!,
  );
};
