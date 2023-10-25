import { Component, OnDestroy, OnInit } from '@angular/core';
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

import { StoreService } from 'src/app/core/services/store.service';
import { AuthService } from 'src/app/core/services/auth.service';

interface CreateStoreForm {
  storeName: FormControl<string>;
  coverImage: FormControl<string | null>;
}

@Component({
  selector: 'app-create-store',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.scss'],
})
export class CreateStoreComponent implements OnInit, OnDestroy {
  createStoreForm!: FormGroup<CreateStoreForm>;
  storeNamePlaceholder = 'BuyAt.store';
  showcaseCover = '../../../../assets/images/background-1.png';
  private destroy$ = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly storeService: StoreService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.createStoreForm = new FormGroup<CreateStoreForm>({
      storeName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(4)],
        nonNullable: true,
      }),
      coverImage: new FormControl(null, {
        nonNullable: false,
      }),
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createStore(): void {
    const { storeName } = this.createStoreForm.value;
    if (!storeName) return;
    this.storeService
      .createStore({ storeName })
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (res.status === 'fail') return;
        this.router.navigateByUrl(`/dashboard/store/${res.data.slug}`);
        this.authService
          .getCurrentUser()
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            if (res.status === 'fail') return;
            this.authService.currentUser.next(res.data);
          });
      });
  }
}
