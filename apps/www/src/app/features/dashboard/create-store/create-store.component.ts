import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { StoreService } from '~core/services/store.service';
import { AuthService } from '~core/services/auth.service';

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
    private readonly storeService: StoreService,
    private readonly router: Router,
    private readonly authService: AuthService,
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
      .subscribe((store) => {
        const currentUser = this.authService.currentUser.value;
        if (!currentUser) return;
        this.authService.currentUser.next({
          ...currentUser,
          stores: [...currentUser.stores, store],
        });
        this.router.navigateByUrl(`/dashboard/store/${store.slug}`);
      });
  }
}
