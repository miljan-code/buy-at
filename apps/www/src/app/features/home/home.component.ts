import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from '~core/services/auth.service';
import { HeroComponent } from './hero/hero.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroComponent, HeaderComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  currentUser$ = this.authService.currentUser$;

  constructor(public authService: AuthService) {}
}
