import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { siteConfig } from 'src/config/site';
import type { CreateStoreOpts, Store } from '../models/store.model';
import type { User } from '../models/user.model';
import type { APIResponse } from '../models/rest.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private readonly apiUrl = siteConfig.apiUrls.store;

  constructor(private readonly http: HttpClient) {}

  getUserStores(userId: User['id']): Observable<APIResponse<Store[]>> {
    return this.http.get<APIResponse<Store[]>>(`${this.apiUrl}/${userId}`, {
      withCredentials: true,
    });
  }

  createStore({ storeName }: CreateStoreOpts): Observable<APIResponse<Store>> {
    return this.http.post<APIResponse<Store>>(
      this.apiUrl,
      {
        storeName,
      },
      { withCredentials: true },
    );
  }
}
