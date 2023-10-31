import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs';

import { NavLinkComponent } from './components/nav-link.component';
import { StoreService } from '~core/services/store.service';
import { dashboardConfig } from '~config/dashboard';
import { onDestroy } from '~shared/utils/destroy';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, NavLinkComponent, RouterModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  currentURL = '';
  navLinks = dashboardConfig.navLinks;
  private destroy$ = onDestroy();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly storeService: StoreService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        takeUntil(this.destroy$),
        switchMap((params) => {
          const slug = params.get('slug') || '';
          this.currentURL = `/dashboard/store/${slug}`;
          return this.storeService.getStore(slug);
        }),
      )
      .subscribe((store) => this.storeService.setActiveStore(store));
  }
}
