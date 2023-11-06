import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { map } from 'rxjs';

import { StoreService } from '~core/services/store.service';

export const storeGuard = (route: ActivatedRouteSnapshot) => {
  const storeService = inject(StoreService);
  const router = inject(Router);
  const slug = route.paramMap.get('slug') || '';

  return storeService.getStore(slug).pipe(
    map((store) => {
      if (!store) {
        router.navigateByUrl('/dashboard');
        return false;
      } else {
        storeService.setActiveStore(store);
        return true;
      }
    }),
  );
};
