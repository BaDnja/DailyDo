import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }


  updateItem<T extends {id: string}>(items: T[], updatedItem: T, saveItems: (items: T[]) => void): void {
    const itemIndex = items.findIndex(item => item.id === updatedItem.id);
    if (itemIndex !== -1) {
      items[itemIndex] = updatedItem;
    }
    saveItems(items);
  }
}
