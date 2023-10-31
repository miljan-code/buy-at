import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';

import { AuthService } from '~core/services/auth.service';
import { LocalService } from '~core/services/local.service';
import { onDestroy } from '~shared/utils/destroy';

@Component({
  selector: 'app-header-base',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: '',
})
export class HeaderBaseComponent {
  protected destroy$ = onDestroy();

  constructor(
    public authService: AuthService,
    public localService: LocalService,
    public router: Router,
  ) {}

  signOut(): void {
    this.authService
      .logout()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.authService.currentUser.next(null);
        this.localService.remove(this.localService.userKey);
        this.router.navigateByUrl('/');
      });
  }
}
