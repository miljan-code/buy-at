import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { siteConfig, type SiteConfig } from '~config/site';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private mainAppUrl = 'http://localhost:4200/';
  private config = new BehaviorSubject<SiteConfig | null>(siteConfig);
  apiUrl = 'http://localhost:5000/api/template';
  config$ = this.config.asObservable();

  constructor(private readonly http: HttpClient) {}

  getConfig(): Observable<SiteConfig | null> | null {
    const currentLocation = window.location.href;
    if (currentLocation === this.mainAppUrl) return null;

    return this.http.get<SiteConfig>(this.apiUrl).pipe(
      tap({
        next: (config) => {
          if (!config && currentLocation !== this.mainAppUrl) {
            window.location.href = this.mainAppUrl;
            return;
          }
          if (config) this.config.next(config);
        },
        error: () => {
          window.location.href = this.mainAppUrl;
          return;
        },
      }),
    );
  }
}
