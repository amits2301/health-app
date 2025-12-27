import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Item } from '../models/items.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private http = inject(HttpClient);

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('/items');
  }
}
