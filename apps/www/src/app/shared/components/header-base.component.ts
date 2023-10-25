import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { LocalService } from 'src/app/core/services/local.service';

@Component({
  selector: 'app-header-base',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '',
})
export class HeaderBaseComponent implements OnDestroy {
  protected destroy$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    public localService: LocalService,
  ) {}

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signOut(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.status === 'fail') return;
        this.authService.currentUser.next(null);
        this.localService.remove(this.localService.userKey);
      });
  }
}
