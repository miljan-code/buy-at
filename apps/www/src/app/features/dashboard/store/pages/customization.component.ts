import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { StoreService } from '~core/services/store.service';
import { UploadDirective } from '~shared/directives/upload.directive';

@Component({
  selector: 'app-customization',
  standalone: true,
  imports: [CommonModule, InputTextModule, ButtonModule, UploadDirective],
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
})
export class CustomizationComponent {
  store$ = this.storeService.store$;

  constructor(private readonly storeService: StoreService) {}

  handleUploadCover(imageUrl: string | null) {}
}
