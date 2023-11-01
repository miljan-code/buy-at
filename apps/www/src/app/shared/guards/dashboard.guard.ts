import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { StoreService } from '~core/services/store.service';

export const dashboardGuard = () => {
  const storeService = inject(StoreService);
  const router = inject(Router);
  return storeService.getStores().pipe(
    map((stores) => {
      if (!stores.length) {
        router.navigateByUrl('/dashboard/store/new');
        return false;
      }
      return true;
    }),
  );
};
