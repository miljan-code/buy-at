import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

import { HeaderComponent } from './header/header.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from 'src/app/core/services/store.service';
import type { User } from 'src/app/core/models/user.model';
import type { Store } from 'src/app/core/models/store.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CreateStoreComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  currentUser: User | null = null;
  stores: Store[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$
      .pipe(takeUntil(this.destroy$))
      .subscribe((user) => (this.currentUser = user));

    if (!this.currentUser?.id) return;
    this.storeService
      .getUserStores(this.currentUser.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.status === 'fail') return;
        this.stores = res.data;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
