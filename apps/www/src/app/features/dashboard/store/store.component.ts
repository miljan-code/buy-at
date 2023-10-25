import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent implements OnInit {
  storeId = '';
  private destroy$ = new Subject<void>();

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.storeId = params.get('storeId') || '';
    });
  }
}
