import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderBaseComponent } from 'src/app/shared/components/header-base.component';

@Component({
  selector: 'app-header-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends HeaderBaseComponent {}
