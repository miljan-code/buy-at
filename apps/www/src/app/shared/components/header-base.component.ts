import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { AuthService } from 'src/app/core/services/auth.service';
import { LocalService } from 'src/app/core/services/local.service';
import type { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-header-base',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '',
})
export class HeaderBaseComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  protected destroy$ = new Subject<void>();

  constructor(
    public authService: AuthService,
    public localService: LocalService,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.currentUser = user));
  }

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
