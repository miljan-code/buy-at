import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';

import { siteConfig } from 'src/config/site';
import type { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { APIResponse } from '../models/rest.model';

type LoginValidationErrors =
  | { wrongPassword: boolean }
  | { wrongEmail: boolean };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = siteConfig.apiUrls.auth;
  currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<APIResponse<User>> {
    return this.http.post<APIResponse<User>>(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }
}
