import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { BillboardComponent } from '~shared/components/billboard.component';
import { ProductComponent } from '~shared/components/product.component';
import type { Product } from '~core/models/product.model';
import type { Category } from '~core/models/category.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ProductComponent, BillboardComponent],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent {
  data$ = inject(ActivatedRoute).data.pipe(
    map((data) => ({
      products: data['category'].products as Product[],
      billboard: data['category'].billboard as Category,
    })),
  );
}
