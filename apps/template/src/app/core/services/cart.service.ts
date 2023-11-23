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
    const itemInCart = existingProducts.find(
      (i) => i.product.id === product.id,
    );
    if (itemInCart) {
      const filteredProducts = existingProducts.filter(
        (i) => i.product.id !== itemInCart.product.id,
      );
      this.cart.next([
        ...filteredProducts,
        { product, quantity: itemInCart.quantity + 1 },
      ]);
    } else {
      this.cart.next([...existingProducts, { product, quantity: 1 }]);
    }
  }
}
