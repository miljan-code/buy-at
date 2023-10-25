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

interface CreateStoreForm {
  storeName: FormControl<string>;
  coverImage: FormControl<string | null>;
}

@Component({
  selector: 'app-first-store',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, ButtonModule],
  templateUrl: './first-store.component.html',
  styleUrls: ['./first-store.component.scss'],
})
export class FirstStoreComponent implements OnInit {
  createStoreForm!: FormGroup<CreateStoreForm>;

  constructor() {}

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

  createStore(): void {}
}
