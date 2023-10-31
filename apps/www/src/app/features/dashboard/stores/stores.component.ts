import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { LinkifyPipe } from '~shared/pipes/linkify.pipe';
import { StoreService } from '~core/services/store.service';

@Component({
  selector: 'app-stores',
  standalone: true,
  imports: [CommonModule, RouterModule, LinkifyPipe],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.scss'],
})
export class StoresComponent {
  stores$ = this.storeService.stores$;

  constructor(private readonly storeService: StoreService) {}
}
