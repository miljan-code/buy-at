import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { StoreService } from '~core/services/store.service';

@Component({
  selector: 'app-customization',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule],
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
})
export class CustomizationComponent {
  store$ = this.storeService.store$;

  constructor(private readonly storeService: StoreService) {}
}
