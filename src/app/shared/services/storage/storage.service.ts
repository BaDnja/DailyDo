import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : [];
  }

  clearData() {
    localStorage.clear();
  }

  deleteSpecificKeyItems(key: string) {
    localStorage.removeItem(key);
  }
}
