import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { StoreService } from '~core/services/store.service';
import { AuthService } from '~core/services/auth.service';
import { AutofocusDirective } from '~shared/directives/autofocus.directive';
import { UploadDirective } from '~shared/directives/upload.directive';

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
export class CreateStoreComponent implements OnInit, OnDestroy {
  createStoreForm!: FormGroup<CreateStoreForm>;
  storeNamePlaceholder = 'BuyAt.store';
  showcaseCover = '/assets/images/background-1.png';
  isLoading = false;
  private destroy$ = new Subject<void>();

  constructor(
    private readonly storeService: StoreService,
    private readonly router: Router,
  ) {}

  createStore(): void {
    const { storeName, coverImage } = this.createStoreForm.value;
    if (!storeName) return;
    this.storeService
      .createStore({ storeName, coverImage })
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
      coverImage: new FormControl(),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
