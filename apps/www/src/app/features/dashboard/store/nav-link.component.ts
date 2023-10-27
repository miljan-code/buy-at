import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-link.component.html',
  styleUrls: ['./nav-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavLinkComponent {
  @Input() url = '';
  @Input() icon = '';
  @Input() label = '';
}
