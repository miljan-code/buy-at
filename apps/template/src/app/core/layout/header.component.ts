import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { siteConfig } from 'src/config/site';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  title = siteConfig.title;
  categories = siteConfig.categories;
  private destroy$ = new Subject<void>();

  constructor(private readonly configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.config$
      .pipe(takeUntil(this.destroy$))
      .subscribe((config) => {
        if (!config) return;
        this.title = config.title;
        this.categories = config.categories;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
