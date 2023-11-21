import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

import { Product } from '~core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();
  cartCount$ = this.cart$.pipe(map((cart) => cart.length));

  addToCart(product: Product): void {
    const existingProducts = this.cart.value;
    this.cart.next([...existingProducts, product]);
  }
}
