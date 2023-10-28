import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreService } from '~core/services/store.service';
import type { Store } from '~core/models/store.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  store: Store | null = null;
  private destroy$ = new Subject<void>();

  constructor(private readonly storeService: StoreService) {}

  ngOnInit(): void {
    this.storeService.store$
      .pipe(takeUntil(this.destroy$))
      .subscribe((store) => (this.store = store));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
