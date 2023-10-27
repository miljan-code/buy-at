import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { siteConfig } from '~config/site';
import type { CreateStoreOpts, Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly apiUrl = siteConfig.apiUrls.store;
  store = new BehaviorSubject<Store | null>(null);
  store$ = this.store.asObservable();

  constructor(private readonly http: HttpClient) {}

  createStore({ storeName }: CreateStoreOpts): Observable<Store> {
    return this.http.post<Store>(this.apiUrl, { storeName });
  }

  getStore(slug: string): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}?slug=${slug}`);
  }
}
