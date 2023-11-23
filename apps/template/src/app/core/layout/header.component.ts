import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

import { ConfigService } from '~core/services/config.service';
import { CartService } from '~core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  config$ = inject(ConfigService).config$;
  cart = inject(CartService);
  sidebarVisible = false;
}
