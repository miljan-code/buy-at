import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreService } from '~core/services/store.service';
import type { Store } from '~core/models/store.model';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  store: Store | null = null;

  constructor(private readonly storeService: StoreService) {
    this.store = this.storeService.store.value;
  }
}
