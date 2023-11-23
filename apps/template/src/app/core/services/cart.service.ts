import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import type { CartItem } from '~core/models/cart.model';
import type { Product } from '~core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([
    {
      product: {
        id: 'jljwd5avlz8ppg3lw9uo227q',
        name: 'Nike Air Force',
        description: 'Nice shoes.',
        image:
          'https://res.cloudinary.com/dbwfcqbx8/image/upload/v1699358603/eb3lqdpoellesfmslqc1.webp',
        featured: true,
        price: 119,
        category: 'Shoes',
        quantity: 10,
        storeSlug: 'my-cool-shop',
        slug: 'nike-air-force',
        createdAt: new Date('2023-11-07T12:03:26.343Z'),
        updatedAt: new Date('2023-11-07T12:03:26.343Z'),
      },
      quantity: 1,
    },
  ]);
  cart$ = this.cart.asObservable();
  cartCount$ = this.cart$.pipe(map((cart) => cart.length));

  addToCart(product: Product): void {
    const existingProducts = this.cart.value;
    const itemIndex = existingProducts.findIndex(
      (i) => i.product.id === product.id,
    );
    if (itemIndex !== -1) {
      const itemInCart = existingProducts[itemIndex];
      existingProducts.splice(itemIndex, 1, {
        product,
        quantity: itemInCart.quantity + 1,
      });
      this.cart.next(existingProducts);
    } else {
      this.cart.next([...existingProducts, { product, quantity: 1 }]);
    }
  }

  removeFromCart(product: Product): void {
    const existingProducts = this.cart.value;
    const itemIndex = existingProducts.findIndex(
      (i) => i.product.id === product.id,
    );
    const itemInCart = existingProducts[itemIndex];
    if (itemInCart.quantity > 1) {
      existingProducts.splice(itemIndex, 1, {
        product,
        quantity: itemInCart.quantity - 1,
      });
      this.cart.next(existingProducts);
    } else {
      existingProducts.splice(itemIndex, 1);
      this.cart.next(existingProducts);
    }
  }
}
