import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { HeaderComponent } from './core/layout/header.component';
import { ConfigService } from './core/services/config.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main class="main">
      <router-outlet />
    </main>
  `,
})
export class AppComponent implements OnInit, OnDestroy {
  private mainAppUrl = 'http://localhost:4200/';
  private destroy$ = new Subject<void>();

  constructor(private readonly configService: ConfigService) {}

  ngOnInit(): void {
    const currentLocation = window.location.href;
    if (currentLocation === this.mainAppUrl) return;

    this.configService
      .getConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (config) => {
          if (!config && currentLocation !== this.mainAppUrl) {
            window.location.href = this.mainAppUrl;
            return;
          }

          if (config) this.configService.config.next(config);
        },
        error: () => {
          window.location.href = this.mainAppUrl;
          return;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
