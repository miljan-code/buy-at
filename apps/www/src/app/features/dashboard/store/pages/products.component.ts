import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';

import { UploadDirective } from '~shared/directives/upload.directive';
import { SectionComponent } from '~shared/components/section.component';
import { ProductService } from '~core/services/product.service';
import { StoreService } from '~core/services/store.service';
import { onDestroy } from '~shared/utils/destroy';
import { productForm } from '~shared/forms/product.form';
import type { Product } from '~core/models/product.model';
import type { Category } from '~core/models/categories.model';

interface CategoryOptions {
  label: string;
  value: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    RouterModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    DropdownModule,
    SelectButtonModule,
    UploadDirective,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = this.route.snapshot.data['products'];
  productForm = productForm;
  dialogVisible = false;
  isLoading = false;
  image = '';
  editId = '';
  categories: CategoryOptions[] = [];
  isFeatured = [
    { label: 'No', value: false },
    { label: 'Yes', value: true },
  ];
  private destroy$ = onDestroy();

  constructor(
    private readonly storeService: StoreService,
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
  ) {}

  addProduct(): void {
    const formData = this.productForm.getRawValue();
    this.isLoading = true;
    this.storeService.activeStore$
      .pipe(
        takeUntil(this.destroy$),
        switchMap((store) => {
          return this.productService.createProduct({
            ...formData,
            storeSlug: store.slug,
          });
        }),
      )
      .subscribe({
        next: (newProduct) => {
          this.products.push(newProduct);
          this.isLoading = false;
          this.dialogVisible = false;
        },
        error: () => {
          this.isLoading = false;
        },
      });
  }

  editProduct(): void {
    const formData = this.productForm.getRawValue();
    this.isLoading = true;
    this.productService
      .updateProduct({
        id: this.editId,
        ...formData,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe((updatedProduct) => {
        const products = this.products.filter(
          (item) => item.id !== updatedProduct.id,
        );
        this.products = [...products, updatedProduct];
        this.isLoading = false;
        this.dialogVisible = false;
      });
  }

  deleteProduct(productId: string): void {
    this.productService
      .deleteProduct(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((product) => {
        this.products = this.products.filter((item) => item.id !== product.id);
      });
  }

  openDialog(productId: string | null = null): void {
    if (productId) {
      const product = this.products.find((item) => item.id === productId);
      if (!product) return;
      this.productForm.patchValue(product);
      this.editId = productId;
      this.image = product.image;
    } else {
      this.productForm.reset();
      this.editId = '';
      this.image = '';
    }
    this.dialogVisible = true;
  }

  handleUpload(value: string): void {
    this.productForm.controls.image.setValue(value);
    this.image = value;
  }

  handleLoading(value: boolean): void {
    this.isLoading = value;
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    const categories: Category[] = this.route.snapshot.data['categories'];
    const mappedCategories = categories.map((category) => ({
      label: category.name,
      value: category.name,
    }));
    this.categories = mappedCategories;
  }
}
