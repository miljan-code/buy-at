import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { takeUntil } from 'rxjs';

import { UploadService } from '~core/services/upload.service';
import { onDestroy } from '~shared/utils/destroy';

@Directive({
  selector: '[upload]',
  standalone: true,
})
export class UploadDirective {
  @Output() onUpload = new EventEmitter<string>();
  @Output() isUploading = new EventEmitter<boolean>(false);
  private destroy$ = onDestroy();

  constructor(private readonly uploadService: UploadService) {}

  // TODO: handle file types based on type of upload (Logo|Fav)
  @HostListener('change', ['$event']) onChange(event: Event): void {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    const element = event.target as HTMLInputElement;
    const file = element.files && element.files[0];
    if (!file || !allowedTypes.includes(file.type)) return;
    this.isUploading.emit(true);
    this.uploadService
      .uploadImage(file)
      .pipe(takeUntil(this.destroy$))
      .subscribe((imageUrl) => {
        this.onUpload.emit(imageUrl);
        this.isUploading.emit(false);
      });
  }
}
