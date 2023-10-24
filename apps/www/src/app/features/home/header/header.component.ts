import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import { HeaderBaseComponent } from 'src/app/shared/components/header-base.component';
import type { NavLink } from 'src/config/site';

@Component({
  selector: 'app-header-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends HeaderBaseComponent {
  navLinks: NavLink[] = [];
}
