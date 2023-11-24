import { Attribute, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { categoryForm } from '~shared/forms/category.form';
import type { Category } from '~core/models/categories.model';

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

  get attributes(): FormArray {
    return this.categoryForm.get('attributes') as FormArray;
  }

  options(i: number): FormArray {
    return this.attributes.controls[i].get('options') as FormArray;
  }

  addAttribute(): void {
    const newAttr = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      options: new FormArray([
        new FormControl('', {
          validators: Validators.required,
          nonNullable: true,
        }),
      ]),
    });

    this.attributes.push(newAttr);
  }

  addOption(i: number): void {
    const newControl = new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    });

    this.options(i).push(newControl);
  }

  openDialog(categoryId: string | null = null): void {
    if (categoryId) {
      const category = this.categories.find((item) => item.id === categoryId);
      if (!category) return;
      const attributes = this.handleAttributes(category);
      this.categoryForm.patchValue({
        name: category.name,
        bilboard: category.bilboard,
        attributes,
      });
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

  private handleAttributes(category: Category) {
    const attributes = category.attributes.map((attr) => ({
      name: attr.name,
      options: attr.options.map((opt) => opt.name),
    }));
    this.attributes.clear();
    this.addAttribute();
    for (let i = 0; i < attributes.length; i++) {
      this.addAttribute();
      for (let j = 1; j < attributes[i].options.length; j++) {
        this.addOption(i);
      }
    }
    return attributes;
  }
}
