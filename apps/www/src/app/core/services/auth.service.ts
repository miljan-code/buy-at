import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { siteConfig } from 'src/config/site';
import type { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = siteConfig.apiUrls.auth;
  currentUser = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUser.asObservable();

  constructor(private readonly http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(
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
  ): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/register`,
      {
        username,
        email,
        password,
      },
      { withCredentials: true },
    );
  }

  logout(): Observable<null> {
    return this.http.get<null>(`${this.apiUrl}/logout`, {
      withCredentials: true,
    });
  }

  getCurrentUser(): Observable<User> {
    return this.http
      .get<User>(this.apiUrl, {
        withCredentials: true,
      })
      .pipe(
        tap({
          next: (user) => this.currentUser.next(user),
        }),
      );
  }
}
