import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreService } from '~core/services/store.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  store$ = this.storeService.activeStore$;

  constructor(private readonly storeService: StoreService) {}
}
