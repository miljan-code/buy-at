import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { SectionComponent } from '~shared/components/section.component';
import { CategoryService } from '~core/services/category.service';

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
  categories = [];
  dialogVisible = false;
  categoryForm!: FormGroup<CategoryForm>;

  constructor(private readonly categoryService: CategoryService) {}

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
