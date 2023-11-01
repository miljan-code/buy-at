import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TreeSelectModule } from 'primeng/treeselect';
import { SelectButtonModule } from 'primeng/selectbutton';

import { SectionComponent } from '~shared/components/section.component';
import { ProductService } from '~core/services/product.service';
import type { Product } from '~core/models/product.model';

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
    TreeSelectModule,
    SelectButtonModule,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products$ = new Observable<Product[]>();
  dialogVisible = true;
  selectOptions = [];
  featuredOptions = [
    { label: 'No', value: false },
    { label: 'Yes', value: true },
  ];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly productService: ProductService,
  ) {}

  handleDialog(): void {
    this.dialogVisible = !this.dialogVisible;
  }

  ngOnInit(): void {
    this.products$ = this.activatedRoute.parent!.paramMap.pipe(
      switchMap((params) => {
        const slug = params.get('slug') || '';
        return this.productService.getProducts(slug);
      }),
    );
  }
}
