import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from '~core/services/auth.service';
import { StoreService } from '~core/services/store.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly storeService: StoreService,
    private readonly router: Router,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  canActivate(): void {
    const userId = this.authService.currentUser.value?.id;
    if (!userId) return;
    this.storeService
      .getUserStores(userId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.status === 'fail') return;
        if (!res.data.length) {
          this.router.navigateByUrl('/dashboard/store/new');
        }
      });
  }
}
