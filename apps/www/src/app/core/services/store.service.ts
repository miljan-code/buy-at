import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';

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
  private activeStore = new BehaviorSubject<Store>({} as Store);
  private stores = new BehaviorSubject<Store[]>([]);
  activeStore$ = this.activeStore.asObservable();
  stores$ = this.stores.asObservable();

  constructor(private readonly http: HttpClient) {
    this.getStores().subscribe((stores) => this.stores.next(stores));
  }

  getStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }

  createStore(storeOpts: CreateStoreOpts): Observable<Store> {
    return this.http.post<Store>(this.apiUrl, storeOpts).pipe(
      tap((newStore) => {
        const stores = this.stores.value;
        this.stores.next([...stores, newStore]);
      }),
    );
  }

  updateStore(storeOpts: UpdateStoreOpts): Observable<Store> {
    return this.http
      .patch<Store>(`${this.apiUrl}/${storeOpts.id}`, storeOpts)
      .pipe(
        tap((updatedStore) => {
          const stores = this.stores.value.filter(
            (item) => item.id !== updatedStore.id,
          );
          this.stores.next([...stores, updatedStore]);
        }),
      );
  }

  getStore(slug: string): Observable<Store | null> {
    return this.stores$.pipe(
      map((stores) => stores.find((store) => store.slug === slug) || null),
    );
  }

  setActiveStore(store: Store): void {
    this.activeStore.next(store);
  }
}
