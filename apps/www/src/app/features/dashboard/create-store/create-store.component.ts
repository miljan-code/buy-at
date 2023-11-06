import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { StoreService } from '~core/services/store.service';
import { UploadDirective } from '~shared/directives/upload.directive';
import { onDestroy } from '~shared/utils/destroy';
import { createStoreForm } from '~shared/forms/create-store.form';

@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    UploadDirective,
  ],
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss'],
})
export class CreateStoreComponent {
  createStoreForm = createStoreForm;
  storeNamePlaceholder = 'BuyAt.store';
  showcaseCover = '/assets/images/background-1.png';
  isLoading = false;
  private destroy$ = onDestroy();

  constructor(
    private readonly storeService: StoreService,
    private readonly router: Router,
  ) {}

  createStore(): void {
    const formData = this.createStoreForm.getRawValue();
    this.storeService
      .createStore(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe((store) => {
        this.router.navigateByUrl(`/dashboard/store/${store.slug}`);
      });
  }

  handleUpload(imageUrl: string): void {
    this.showcaseCover = imageUrl;
    this.createStoreForm.controls.coverImage.setValue(imageUrl);
  }

  handleLoading(value: boolean): void {
    this.isLoading = value;
  }
}
