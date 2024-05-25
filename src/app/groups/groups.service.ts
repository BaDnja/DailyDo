import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../shared/services/storage/storage.service";
import {ListsService} from "../lists/lists.service";
import {Group} from "./group.model";
import {List} from "../lists/list.model";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private groupsSubject = new BehaviorSubject<any[]>(this.getGroups());
  private readonly localStorageKey: string = 'groups';
  groups$ = this.groupsSubject.asObservable();

  constructor(private storage: StorageService,
              private listsService: ListsService) { }

  getNewId(groups: any[]): string {
    return String(groups.reduce((max, group) => Math.max(max, Number(group.id)), 0) + 1);
  }

  getGroups(): Group[] {
    return this.storage.getItem(this.localStorageKey);
  }

  saveGroups(groups: Group[]): void {
    this.storage.setItem(this.localStorageKey, JSON.stringify(groups));
    this.groupsSubject.next(groups);
  }

  updateGroup(updatedGroup: List) {
    const groups: List[] = this.getGroups();
    const groupIndex = groups.findIndex(group => group.id === updatedGroup.id);
    if (groupIndex !== -1) {
      groups[groupIndex] = updatedGroup;
    }
    this.saveGroups(groups);
  }

  deleteAllGroups(): void {
    this.storage.deleteSpecificKeyItems(this.localStorageKey);
    this.groupsSubject.next([]);
  }
}
