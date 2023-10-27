import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';

import { StoreService } from '~core/services/store.service';
import type { Store } from '~core/models/store.model';

export const storeResolver: ResolveFn<Store> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  return inject(StoreService).getStore(route.paramMap.get('slug')!);
};
