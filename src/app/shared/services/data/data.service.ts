import {Injectable} from '@angular/core';
import {StorageService} from "../storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: StorageService) {
  }

  getItems<T>(key: string): T[] {
    return this.storage.getItem(key);
  }

  saveItems<T extends { id: string }>(key: string, items: T[]): void {
    this.storage.setItem(key, JSON.stringify(items));
  }

  updateItem<T extends { id: string }>(items: T[], updatedItem: T): T[] {
    const itemIndex = items.findIndex(item => item.id === updatedItem.id);
    if (itemIndex !== -1) {
      items[itemIndex] = updatedItem;
    }
    return items;
  }
}
