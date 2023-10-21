import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { siteConfig } from 'src/config/site';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  title = siteConfig.title;
  coverImage = siteConfig.coverImage;
}
