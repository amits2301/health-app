import { TestBed } from '@angular/core/testing';
import { ItemsStore } from './items.store';
import { ItemsService } from '../services/items.service';
import { of, throwError } from 'rxjs';

describe('ItemsStore', () => {
  let store: InstanceType<typeof ItemsStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ItemsStore,
        {
          provide: ItemsService,
          useValue: {
            getItems: () => of([{ id: 1, name: 'Item 1', description: 'desc' }]),
          },
        },
      ],
    });

    store = TestBed.inject(ItemsStore);
  });

  it('should load items successfully', () => {
    store.loadItems();
    expect(store.items().length).toBe(1);
    expect(store.loadingState().status).toBe('loaded');
  });
});
