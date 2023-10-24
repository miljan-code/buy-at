import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import { ButtonModule } from 'primeng/button';

import { AuthService } from '../services/auth.service';
import type { User } from '../models/user.model';
import type { NavLink } from 'src/config/site';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  navLinks: NavLink[] = [];
  currentUser: User | null = null;
  private destroy$ = new Subject<void>();

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  signOut(): void {
    this.authService.logout();
  }
}
