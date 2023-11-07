import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from '~core/services/config.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  config$ = inject(ConfigService).config$;
  featured$ = this.config$.pipe(
    map(
      (config) => config?.products.filter((product) => product.featured) || [],
    ),
  );
}
