import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { StoreService } from '~core/services/store.service';
import { UploadDirective } from '~shared/directives/upload.directive';
import { onDestroy } from '~shared/utils/destroy';
import type { Store } from '~core/models/store.model';

interface CustomizationForm {
  name: FormControl<string | null>;
  logo: FormControl<string | null>;
  favicon: FormControl<string | null>;
  coverImage: FormControl<string | null>;
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
        id: this.store?.id || '',
        coverImage: formData.coverImage || undefined,
        favicon: formData.favicon || undefined,
        logo: formData.logo || undefined,
        storeName: formData.name || '',
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((store) => {
        this.store = store;
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Saved',
          detail: 'Store is successfully updated',
        });
      });
  }

  handleImage(value: string | null, type: UploadType): void {
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
      coverImage: new FormControl(''),
      logo: new FormControl(''),
      favicon: new FormControl(''),
    });

    this.storeService.activeStore$
      .pipe(takeUntil(this.destroy$))
      .subscribe((store) => {
        if (!store) return;
        this.store = store;
        const { controls } = this.customizationForm;
        Object.keys(controls).forEach((key) => {
          controls[key as keyof typeof controls].setValue(
            store[key as keyof typeof controls],
          );
        });
      });
  }
}
