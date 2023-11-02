import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, mergeMap, of } from 'rxjs';

import { siteConfig } from '~config/site';
import type {
  Category,
  CreateCategoryOpts,
} from '~core/models/categories.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly apiUrl = siteConfig.apiUrls.category;
  private categories = new BehaviorSubject<Category[]>([]);
  categories$ = this.categories.asObservable();

  constructor(private readonly http: HttpClient) {}

  getCategories(storeSlug: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/${storeSlug}`).pipe(
      mergeMap((products) => {
        this.categories.next(products);
        return of(products);
      }),
    );
  }

  createCategory(categoryOpts: CreateCategoryOpts): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, categoryOpts);
  }
}
