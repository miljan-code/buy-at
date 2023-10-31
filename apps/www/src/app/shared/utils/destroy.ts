import { ChangeDetectorRef, inject, type ViewRef } from '@angular/core';
import { Subject } from 'rxjs';

export const onDestroy = () => {
  const destroy$ = new Subject<void>();
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => {
    console.log('Im getting destroyed');
    destroy$.next();
    destroy$.complete();
  });

  return destroy$;
};
