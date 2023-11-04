import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { SectionComponent } from '~shared/components/section.component';
import { CategoryService } from '~core/services/category.service';
import { onDestroy } from '~shared/utils/destroy';
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
  activeStore: string = this.activatedRoute.snapshot.data['storeSlug'] || '';
  dialogVisible = false;
  categoryForm!: FormGroup<CategoryForm>;
  private destroy$ = onDestroy();

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly categoryService: CategoryService,
  ) {}

  handleDialog(): void {
    this.dialogVisible = !this.dialogVisible;
  }

  submitForm(): void {
    const formData = this.categoryForm.getRawValue();

    this.categoryService
      .createCategory({
        ...formData,
        storeSlug: this.activeStore,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        this.handleDialog();
        this.categories.push(category);
      });
  }

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
