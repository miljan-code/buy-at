import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import type { CartItem } from '~core/models/cart.model';
import type { Product } from '~core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cart.asObservable();
  cartCount$ = this.cart$.pipe(map((cart) => cart.length));
  cartTotal$ = this.cart$.pipe(
    map((cart) =>
      cart.reduce((acc, cartItem) => {
        const itemTotal = cartItem.product.price * cartItem.quantity;
        return acc + itemTotal;
      }, 0),
    ),
  );

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
