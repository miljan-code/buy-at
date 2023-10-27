import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';

import { NavLinkComponent } from './nav-link.component';
import { StoreService } from '~core/services/store.service';
import { dashboardConfig } from '~config/dashboard';
import type { Store } from '~core/models/store.model';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, NavLinkComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit, OnDestroy {
  store: Store | null = null;
  currentURL = '';
  navLinks = dashboardConfig.navLinks;
  private destroy$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const slug = params.get('slug') || '';
          this.currentURL = `/dashboard/store/${slug}`;
          return this.storeService.getStore(slug);
        }),
      )
      .subscribe((store) => (this.store = store));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
