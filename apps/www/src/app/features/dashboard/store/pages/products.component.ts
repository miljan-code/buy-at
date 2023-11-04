import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { takeUntil } from 'rxjs';

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
import { onDestroy } from '~shared/utils/destroy';
import type { Product } from '~core/models/product.model';

interface ProductForm {
  name: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  category: FormControl<string>;
  quantity: FormControl<number>;
  featured: FormControl<boolean>;
  image: FormControl<string>;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    SectionComponent,
    TableModule,
    ButtonModule,
    FormsModule,
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
  productForm!: FormGroup<ProductForm>;
  image = '/assets/images/img-placeholder.png';
  dialogVisible = false;
  isLoading = false;
  activeStore: string = this.route.snapshot.data['storeSlug'] || '';
  categories = [
    { label: 'Shoes', value: 'shoes' },
    { label: 'Computers', value: 'computers' },
  ];
  isFeatured = [
    { label: 'No', value: false },
    { label: 'Yes', value: true },
  ];
  private destroy$ = onDestroy();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService,
  ) {}

  submitForm(): void {
    const formData = this.productForm.getRawValue();
    this.isLoading = true;
    this.productService
      .createProduct({
        ...formData,
        storeSlug: this.activeStore,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (newProduct) => {
          this.isLoading = false;
          this.dialogVisible = false;
          this.products.push(newProduct);
        },
      });
  }

  editProduct(productId: string): void {
    this.handleDialog();
  }

  deleteProduct(productId: string): void {
    this.productService
      .deleteProduct(productId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((product) => {
        const newProducts = this.products.filter(
          (item) => item.id !== product.id,
        );
        this.products = newProducts;
      });
  }

  handleDialog(): void {
    this.dialogVisible = !this.dialogVisible;
  }

  handleUpload(value: string): void {
    this.productForm.controls.image.setValue(value);
    this.image = value;
  }

  handleLoading(value: boolean): void {
    this.isLoading = value;
  }

  ngOnInit(): void {
    this.productForm = new FormGroup<ProductForm>({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      description: new FormControl('', {
        nonNullable: true,
      }),
      price: new FormControl(0, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      category: new FormControl(this.categories[0].value, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      quantity: new FormControl(1, {
        nonNullable: true,
      }),
      featured: new FormControl(false, {
        validators: [Validators.required],
        nonNullable: true,
      }),
      image: new FormControl('', {
        nonNullable: true,
      }),
    });
  }
}
