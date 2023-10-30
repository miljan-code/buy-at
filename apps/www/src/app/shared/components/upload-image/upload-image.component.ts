import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

import { UploadService } from '~core/services/upload.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-upload-image',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnDestroy {
  @Output() onUpload = new EventEmitter<string | null>();
  private destroy$ = new Subject<void>();

  constructor(private readonly uploadService: UploadService) {}

  uploadImage(event: Event): void {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const element = event.target as HTMLInputElement;
    const file = element.files && element.files[0];
    if (!file || !allowedTypes.includes(file.type)) return;
    this.uploadService
      .uploadImage(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe((imageUrl) => this.onUpload.emit(imageUrl));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
