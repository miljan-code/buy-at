import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { ButtonModule } from 'primeng/button';

import { CartService } from '~core/services/cart.service';
import type { Product } from '~core/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  product$ = inject(ActivatedRoute).data.pipe(
    map((product) => product['product'] as Product),
  );
  cart = inject(CartService);
}
