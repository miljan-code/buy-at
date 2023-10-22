import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { siteConfig } from 'src/config/site';
import { ConfigService } from 'src/app/core/services/config.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  title = siteConfig.title;
  coverImage = siteConfig.coverImage;
  private destroy$ = new Subject<void>();

  constructor(private readonly configService: ConfigService) {}

  ngOnInit(): void {
    this.configService.config$
      .pipe(takeUntil(this.destroy$))
      .subscribe((config) => {
        if (!config) return;
        this.title = config.title;
        this.coverImage = config.coverImage;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
