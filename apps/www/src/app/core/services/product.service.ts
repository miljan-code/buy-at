import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, mergeMap, of } from 'rxjs';

import { siteConfig } from '~config/site';
import type { CreateProductOpts, Product } from '~core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = siteConfig.apiUrls.product;
  private products = new BehaviorSubject<Product[]>([]);
  products$ = this.products.asObservable();

  constructor(private readonly http: HttpClient) {}

  getProducts(storeSlug: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${storeSlug}`).pipe(
      mergeMap((products) => {
        this.products.next(products);
        return of(products);
      }),
    );
  }

  createProduct(productOpts: CreateProductOpts): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productOpts);
  }
}
