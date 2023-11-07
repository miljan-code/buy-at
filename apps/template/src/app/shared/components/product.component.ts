import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import type { Product } from '~core/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="['/category', product.category | lowercase, product.slug]"
      class="product"
    >
      <img [src]="product.image" [alt]="product.name" class="product__image" />
      <div class="product__info">
        <p>{{ product.name }}</p>
        <p>{{ product.category }}</p>
      </div>
      <span class="product__price">{{ product.price | currency }}</span>
    </a>
  `,
  styles: [
    `
      @import 'mixins';
      @import 'variables';
      @import 'functions';

      .product {
        display: flex;
        flex-direction: column;
        gap: rem(18px);

        border: 1px solid $color-border;
        border-radius: rem(6px);
        padding: rem(12px);
        height: rem(340px);

        &__image {
          width: rem(200px);
          height: rem(200px);
          border-radius: rem(6px);
          object-fit: cover;
        }

        &__info {
          display: flex;
          flex-direction: column;
          gap: rem(4px);

          & p:last-child {
            font-size: rem(15px);
            color: $color-white-hover;
          }
        }

        &__price {
          margin-top: auto;
          font-size: rem(18px);
          font-weight: 600;
        }
      }
    `,
  ],
})
export class ProductComponent {
  @Input({ required: true }) product!: Product;
}
