import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ButtonModule } from 'primeng/button';

import type { User } from '~core/models/user.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonModule, RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  @Input() currentUser: User | null = null;
}
