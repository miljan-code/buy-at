import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';

export const storeSlugResolver: ResolveFn<string | null> = (
  route: ActivatedRouteSnapshot,
) => {
  return route.paramMap.get('slug')!;
};
