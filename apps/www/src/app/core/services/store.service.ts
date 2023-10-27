import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { siteConfig } from '~config/site';
import type { CreateStoreOpts, Store } from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly apiUrl = siteConfig.apiUrls.store;

  constructor(private readonly http: HttpClient) {}

  createStore({ storeName }: CreateStoreOpts): Observable<Store> {
    return this.http.post<Store>(
      this.apiUrl,
      { storeName },
      { withCredentials: true },
    );
  }

  getStore(slug: string): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}?slug=${slug}`, {
      withCredentials: true,
    });
  }
}
