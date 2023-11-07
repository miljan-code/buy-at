import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { siteConfig } from '~config/site';

@Component({
  selector: 'app-billboard',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="billboard">
      <img
        [src]="data.coverImage || siteConfig.coverImage"
        alt="Cover image"
        class="billboard__img"
      />
      <h1 class="billboard__title">{{ data.title }}</h1>
    </div>
  `,
  styles: [
    `
      @import 'mixins';
      @import 'variables';
      @import 'functions';

      .billboard {
        position: relative;

        max-width: $bp-largest;
        margin: 0 auto;
        padding: rem(12px) 0;

        &__img {
          width: 100%;
          height: rem(400px);

          object-fit: cover;
          border-radius: rem(12px);
        }

        &__title {
          @include center-absolute;

          font-family: $font-heading;
          font-size: rem(64px);
        }
      }
    `,
  ],
})
export class BillboardComponent {
  @Input({ required: true }) data!: { coverImage: string; title: string };
  siteConfig = siteConfig;
}
