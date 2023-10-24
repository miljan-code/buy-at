import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  userKey = 'BuyAt__user';

  constructor() {}

  save<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get(key: string) {
    const item = localStorage.getItem(key);
    if (item) return JSON.parse(item);
    else return null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
}
