import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { siteConfig, type SiteConfig } from 'src/config/site';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  apiUrl = 'http://localhost:5000/api/template';
  config = new BehaviorSubject<SiteConfig | null>(siteConfig);
  config$ = this.config.asObservable();

  constructor(private readonly http: HttpClient) {}

  getConfig(): Observable<SiteConfig | null> {
    return this.http.get<SiteConfig>(this.apiUrl);
  }
}
