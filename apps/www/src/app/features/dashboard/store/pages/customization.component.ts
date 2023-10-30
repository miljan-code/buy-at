import { Component, OnDestroy, OnInit } from '@angular/core';
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

import { StoreService } from '~core/services/store.service';
import { UploadDirective } from '~shared/directives/upload.directive';
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
  ],
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.scss'],
})
export class CustomizationComponent implements OnInit, OnDestroy {
  customizationForm!: FormGroup<CustomizationForm>;
  store: Store | null = null;
  picPlaceholder = '/assets/images/img-placeholder.png';
  private destroy$ = new Subject<void>();

  constructor(private readonly storeService: StoreService) {}

  submitForm(): void {
    const formData = this.customizationForm.value;
    console.log(formData);
  }

  handleImage(value: string | null, type: UploadType): void {
    if (!this.store) return;
    this.customizationForm.controls[type].setValue(value);
    this.store[type] = value;
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

    this.storeService.store$
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
