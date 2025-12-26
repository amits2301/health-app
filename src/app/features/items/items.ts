import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ItemsStore } from './data-access/store/items.store';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-items',
  imports: [CommonModule, MatListModule],
  providers: [ItemsStore],
  templateUrl: './items.html',
  styleUrl: './items.scss',
})
export class Items implements OnInit {
  private store = inject(ItemsStore);

  readonly items = this.store.items;
  readonly loadingState = this.store.loadingState;

  ngOnInit(): void {
    this.store.loadItems();
  }
}
