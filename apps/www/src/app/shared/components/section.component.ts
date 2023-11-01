import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="section">
      <div class="section__heading">
        <h2 class="section__label">{{ heading }}</h2>
        <p class="section__sublabel">{{ subheading }}</p>
      </div>
      <ng-content />
    </section>
  `,
  styles: [
    `
      @import 'variables';
      @import 'functions';
      @import 'mixins';

      .section {
        @include flex($direction: column);
        gap: rem(32px);

        &__label {
          font-family: $font-heading;
          font-size: rem(32px);
          margin-bottom: rem(4px);
        }

        &__sublabel {
          color: $color-muted;
        }
      }
    `,
  ],
})
export class SectionComponent {
  @Input({ required: true }) heading = '';
  @Input({ required: true }) subheading = '';
}
