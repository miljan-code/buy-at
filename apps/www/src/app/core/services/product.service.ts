import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, mergeMap, of } from 'rxjs';

import { siteConfig } from '~config/site';
import type { Product } from '~core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = siteConfig.apiUrls.product;
  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();

  constructor(private readonly http: HttpClient) {}

  getProducts(storeId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${storeId}`).pipe(
      mergeMap((products) => {
        this.products.next(products);
        return of(products);
      }),
    );
  }

  // createStore(storeOpts: CreateStoreOpts): Observable<Store> {
  //   return this.http.post<Store>(this.apiUrl, storeOpts).pipe(
  //     mergeMap((newStore) => {
  //       const stores = this.stores.value;
  //       this.stores.next([...stores, newStore]);
  //       return of(newStore);
  //     }),
  //   );
  // }
}
