import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { StoreService } from '~core/services/store.service';
import { AutofocusDirective } from '~shared/directives/autofocus.directive';
import { UploadDirective } from '~shared/directives/upload.directive';
import { onDestroy } from '~shared/utils/destroy';

interface CreateStoreForm {
  storeName: FormControl<string>;
  coverImage: FormControl<string>;
}

@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    AutofocusDirective,
    UploadDirective,
  ],
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss'],
})
export class CreateStoreComponent implements OnInit {
  createStoreForm!: FormGroup<CreateStoreForm>;
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

  ngOnInit(): void {
    this.createStoreForm = new FormGroup<CreateStoreForm>({
      storeName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
        nonNullable: true,
      }),
      coverImage: new FormControl('', {
        nonNullable: true,
      }),
    });
  }
}
