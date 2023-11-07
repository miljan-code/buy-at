import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';

import { ProductComponent } from '~shared/components/product.component';
import { BillboardComponent } from '~shared/components/billboard.component';
import { ConfigService } from '~core/services/config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductComponent, BillboardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  config$ = inject(ConfigService).config$;
  billboard$ = this.config$.pipe(
    map((config) => ({
      coverImage: config?.coverImage || '',
      title: config?.title || '',
    })),
  );
  featured$ = this.config$.pipe(
    map(
      (config) => config?.products.filter((product) => product.featured) || [],
    ),
  );
}
