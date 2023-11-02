import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { siteConfig, type SiteConfig } from 'src/config/site';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl = 'http://localhost:5000/api/template';
  config = new BehaviorSubject<SiteConfig | null>(siteConfig);
  config$ = this.config.asObservable();
  private mainAppUrl = 'http://localhost:4200/';

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
