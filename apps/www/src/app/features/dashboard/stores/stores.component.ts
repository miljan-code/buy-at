import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from '~core/services/auth.service';
import { LinkifyPipe } from '~shared/pipes/linkify.pipe';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule, RouterModule, LinkifyPipe],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent {
  stores$ = this.authService.currentUser$.pipe(
    map((user) => user && user.stores),
  );

  constructor(private readonly authService: AuthService) {}
}
