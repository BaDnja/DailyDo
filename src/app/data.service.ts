import { Injectable } from '@angular/core';
import {StorageService} from "./shared/services/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: StorageService) { }

  getItems<T>(key: string): T[] {
    return this.storage.getItem(key);
  }

  updateItem<T extends {id: string}>(items: T[], updatedItem: T, saveItems: (items: T[]) => void): void {
    const itemIndex = items.findIndex(item => item.id === updatedItem.id);
    if (itemIndex !== -1) {
      items[itemIndex] = updatedItem;
    }
    saveItems(items);
  }
}
