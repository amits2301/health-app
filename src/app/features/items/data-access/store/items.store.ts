import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';

import { Item } from '../models/items.model';
import { ItemsService } from '../services/items.service';
import { LoadingState, initialLoadingState, loadingReducer } from '../loading-state';
import { HttpErrorResponse } from '@angular/common/http';

export interface ItemsState {
  items: Item[];
  loadingState: LoadingState;
}

const initialState: ItemsState = {
  items: [],
  loadingState: { ...initialLoadingState },
};

export const ItemsStore = signalStore(
  withState(initialState),

  withMethods((store, itemsService = inject(ItemsService)) => ({
    loadItems: rxMethod<void>(
      pipe(
        tap(() =>
          patchState(store, {
            loadingState: loadingReducer.query(store.loadingState()),
          })
        ),

        switchMap(() =>
          itemsService.getItems().pipe(
            tapResponse({
              next: (items) =>
                patchState(store, (state) => ({
                  items,
                  loadingState: loadingReducer.success(state.loadingState),
                })),

              error: (error: HttpErrorResponse) =>
                patchState(store, (state) => ({
                  loadingState: loadingReducer.fail(
                    state.loadingState,
                    error.message || 'Failed to load items'
                  ),
                })),
            })
          )
        )
      )
    ),
  }))
);
