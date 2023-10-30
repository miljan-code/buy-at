import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { siteConfig } from '~config/site';
import type {
  CreateStoreOpts,
  Store,
  UpdateStoreOpts,
} from '../models/store.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly apiUrl = siteConfig.apiUrls.store;
  private store = new BehaviorSubject<Store | null>(null);
  store$ = this.store.asObservable();

  constructor(private readonly http: HttpClient) {}

  createStore(storeOpts: CreateStoreOpts): Observable<Store> {
    return this.http.post<Store>(this.apiUrl, storeOpts);
  }

  updateStore(storeOpts: UpdateStoreOpts): Observable<Store> {
    return this.http.patch<Store>(`${this.apiUrl}/${storeOpts.id}`, storeOpts);
  }

  getStore(slug: string): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}?slug=${slug}`);
  }

  setStore(store: Store): void {
    this.store.next(store);
  }
}
