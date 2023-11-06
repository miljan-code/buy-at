import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { NavLinkComponent } from './components/nav-link.component';
import { StoreService } from '~core/services/store.service';
import { dashboardConfig } from '~config/dashboard';

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [CommonModule, NavLinkComponent, RouterModule],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss'],
})
export class StoreComponent {
  slug$ = this.storeService.activeStore$.pipe(map((store) => store.slug));
  navLinks = dashboardConfig.navLinks;

  constructor(private readonly storeService: StoreService) {}
}
