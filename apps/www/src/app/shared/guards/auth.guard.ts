import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs';

import { AuthService } from '~core/services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.currentUser$.pipe(
    filter((currentUser) => currentUser !== null),
    map((currentUser) => {
      if (!currentUser) {
        router.navigateByUrl('/auth');
        return false;
      }
      return true;
    }),
  );
};
