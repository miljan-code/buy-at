import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { takeUntil } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { StoreService } from '~core/services/store.service';
import { UploadDirective } from '~shared/directives/upload.directive';
import { onDestroy } from '~shared/utils/destroy';
import { hydrateFormFields } from '~shared/utils/helpers';
import { SectionComponent } from '~shared/components/section.component';
import type { Store } from '~core/models/store.model';

interface CustomizationForm {
  name: FormControl<string>;
  logo: FormControl<string>;
  favicon: FormControl<string>;
  coverImage: FormControl<string>;
  slug: FormControl<string>;
}

type UploadType = 'coverImage' | 'favicon' | 'logo';

@Component({
  selector: 'app-customization',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    UploadDirective,
    ReactiveFormsModule,
    ToastModule,
    SectionComponent,
  ],
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
})
export class CustomizationComponent implements OnInit {
  customizationForm!: FormGroup<CustomizationForm>;
  store: Store | null = null;
  picPlaceholder = '/assets/images/img-placeholder.png';
  isLoading = false;
  private destroy$ = onDestroy();

  constructor(
    private readonly storeService: StoreService,
    private readonly messageService: MessageService,
  ) {}

  submitForm(): void {
    const formData = this.customizationForm.value;
    this.isLoading = true;
    this.storeService
      .updateStore({
        ...formData,
        id: this.store?.id || '',
        storeName: formData.name,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (store) => {
          this.store = store;
          this.isLoading = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Saved',
            detail: 'Store is successfully updated',
          });
        },
      });
  }

  handleImage(value: string, type: UploadType): void {
    if (!this.store) return;
    this.customizationForm.controls[type].setValue(value);
    this.store[type] = value;
  }

  handleLoading(value: boolean): void {
    this.isLoading = value;
  }

  ngOnInit(): void {
    this.customizationForm = new FormGroup<CustomizationForm>({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      coverImage: new FormControl('', { nonNullable: true }),
      logo: new FormControl('', { nonNullable: true }),
      favicon: new FormControl('', { nonNullable: true }),
      slug: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });

    this.storeService.activeStore$
      .pipe(takeUntil(this.destroy$))
      .subscribe((store) => {
        if (!store) return;
        this.store = store;
        hydrateFormFields([this.customizationForm], store);
      });
  }
}
