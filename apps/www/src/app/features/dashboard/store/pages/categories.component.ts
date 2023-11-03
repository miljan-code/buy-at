import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { SectionComponent } from '~shared/components/section.component';
import type { Category } from '~core/models/categories.model';

interface CategoryForm {
  name: FormControl<string>;
  bilboard: FormControl<string>;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = this.activatedRoute.snapshot.data['categories'];
  dialogVisible = false;
  categoryForm!: FormGroup<CategoryForm>;

  constructor(private readonly activatedRoute: ActivatedRoute) {}

  handleDialog(): void {
    this.dialogVisible = !this.dialogVisible;
  }

  submitForm(): void {}

  ngOnInit(): void {
    this.categoryForm = new FormGroup<CategoryForm>({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      bilboard: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }
}
