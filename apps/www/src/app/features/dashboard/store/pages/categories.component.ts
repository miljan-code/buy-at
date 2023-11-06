import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { SectionComponent } from '~shared/components/section.component';
import { CategoryService } from '~core/services/category.service';
import { StoreService } from '~core/services/store.service';
import { onDestroy } from '~shared/utils/destroy';
import type { Category } from '~core/models/categories.model';
import { categoryForm } from '~shared/forms/category.form';

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
export class CategoriesComponent {
  categories: Category[] = this.route.snapshot.data['categories'];
  categoryForm = categoryForm;
  dialogVisible = false;
  editId = '';
  private destroy$ = onDestroy();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly storeService: StoreService,
    private readonly categoryService: CategoryService,
  ) {}

  openDialog(categoryId: string | null = null): void {
    if (categoryId) {
      const category = this.categories.find((item) => item.id === categoryId);
      if (!category) return;
      this.categoryForm.patchValue(category);
      this.editId = categoryId;
    } else {
      this.categoryForm.reset();
      this.editId = '';
    }
    this.dialogVisible = true;
  }

  addCategory(): void {
    const formData = this.categoryForm.getRawValue();

    this.storeService.activeStore$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((store) => {
          return this.categoryService.createCategory({
            ...formData,
            storeSlug: store?.slug,
          });
        }),
      )
      .subscribe((category) => {
        this.categories.push(category);
        this.dialogVisible = false;
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
        this.categories = this.categories.filter(
          (item) => item.id !== category.id,
        );
      });
  }
}
