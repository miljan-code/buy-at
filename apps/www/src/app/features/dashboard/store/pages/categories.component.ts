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
  categories: Category[] = this.route.snapshot.data['categories'];
  dialogVisible = false;
  activeStore = '';
  editId = '';
  categoryForm!: FormGroup<CategoryForm>;
  private destroy$ = onDestroy();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly categoryService: CategoryService,
  ) {}

  openDialog(categoryId: string | null = null): void {
    if (categoryId) {
      const category = this.categories.find((item) => item.id === categoryId);
      if (!category) return;
      this.categoryForm.patchValue(category);
      this.editId = categoryId;
    } else {
      this.editId = '';
      this.categoryForm.reset();
    }
    this.dialogVisible = true;
  }

  addCategory(): void {
    const formData = this.categoryForm.getRawValue();

    this.categoryService
      .createCategory({
        ...formData,
        storeSlug: this.activeStore,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        this.dialogVisible = false;
        this.categories.push(category);
      });
  }

  editCategory(): void {
    const formData = this.categoryForm.getRawValue();

    this.categoryService
      .updateCategory({
        id: this.editId,
        ...formData,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((updatedCategory) => {
        const categories = this.categories.filter(
          (item) => item.id !== updatedCategory.id,
        );
        this.categories = [...categories, updatedCategory];
        this.dialogVisible = false;
      });
  }

  deleteCategory(categoryId: string): void {
    this.categoryService
      .deleteCategory(categoryId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        const newCategories = this.categories.filter(
          (item) => item.id !== category.id,
        );
        this.categories = newCategories;
      });
  }

  ngOnInit(): void {
    this.route.parent?.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => (this.activeStore = params.get('slug') || ''));

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
