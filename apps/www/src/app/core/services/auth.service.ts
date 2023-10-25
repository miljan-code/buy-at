import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { siteConfig } from 'src/config/site';
import { LocalService } from './local.service';
import type { APIResponse } from '../models/rest.model';
import type { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = siteConfig.apiUrls.auth;
  currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly localService: LocalService,
  ) {
    this.currentUser.next(this.localService.get(this.localService.userKey));
  }

  // TODO: check token validity

  login(email: string, password: string): Observable<APIResponse<User>> {
    return this.http.post<APIResponse<User>>(
      `${this.apiUrl}/login`,
      {
        email,
        password,
      },
      { withCredentials: true },
    );
  }

  register(
    username: string,
    email: string,
    password: string,
  ): Observable<APIResponse<User>> {
    return this.http.post<APIResponse<User>>(
      `${this.apiUrl}/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );
  }

  logout(): Observable<APIResponse<null>> {
    return this.http.get<APIResponse<null>>(`${this.apiUrl}/logout`, {
      withCredentials: true,
    });
  }

  getCurrentUser(): Observable<APIResponse<User>> {
    return this.http.get<APIResponse<User>>(this.apiUrl, {
      withCredentials: true,
    });
  }
}
