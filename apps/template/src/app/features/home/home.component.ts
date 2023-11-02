import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigService } from '~core/services/config.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  config$ = this.configService.config$;

  constructor(private readonly configService: ConfigService) {}
}
