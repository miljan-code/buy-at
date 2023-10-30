import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { siteConfig } from '~config/site';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  private readonly apiUrl = siteConfig.apiUrls.upload;

  constructor(private readonly http: HttpClient) {}

  uploadImage(file: File): Observable<string> {
    const uploadFileData = new FormData();
    uploadFileData.append('image', file, file.name);
    return this.http.post<string>(this.apiUrl, uploadFileData);
  }
}
