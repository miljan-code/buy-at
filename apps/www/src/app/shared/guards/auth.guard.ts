import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '~core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  canActivate(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => {
        if (!user) {
          this.router.navigateByUrl('/auth');
        }
      });
  }
}
