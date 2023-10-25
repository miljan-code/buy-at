import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { StoreService } from 'src/app/core/services/store.service';

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
export class CreateStoreComponent implements OnInit {
  createStoreForm!: FormGroup<CreateStoreForm>;
  storeNamePlaceholder = 'BuyAt.store';
  showcaseCover = '../../../../assets/images/background-1.png';

  constructor(private readonly storeService: StoreService) {}

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

  createStore(): void {
    const { storeName } = this.createStoreForm.value;
    if (!storeName) return;
    this.storeService.createStore({ storeName });
  }
}
