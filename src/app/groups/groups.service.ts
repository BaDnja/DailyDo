import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../shared/services/storage/storage.service";
import {ListsService} from "../lists/lists.service";
import {Group} from "./group.model";
import {DataService} from "../shared/services/data/data.service";
import {StateService} from "../shared/services/state/state.service";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private readonly localStorageKey: string = 'groups';
  private stateService: StateService<Group>;

  constructor(private storage: StorageService,
              private listsService: ListsService,
              private dataService: DataService,
              stateService: StateService<Group>) {
    this.stateService = stateService;
    const initialGroups = this.getGroups();
    this.stateService.initializeState(initialGroups);
  }

  get groups$() {
    return this.stateService.state$;
  }

  getNewId(groups: any[]): string {
    return String(groups.reduce((max, group) => Math.max(max, Number(group.id)), 0) + 1);
  }

  getGroups(): Group[] {
    return this.dataService.getItems(this.localStorageKey);
  }

  saveGroups(groups: Group[]): void {
    this.dataService.saveItems(this.localStorageKey, groups);
    this.stateService.setState(groups);
  }

  updateGroup(updatedGroup: Group) {
    const groups = this.dataService.updateItem(this.getGroups(), updatedGroup);
    this.saveGroups(groups);
  }

  deleteGroup(id: string) {
    const groups = this.getGroups();
    const groupIndex = groups.findIndex(group => group.id === id);
    if (groupIndex !== -1) {
      groups.splice(groupIndex, 1);
    }
    this.saveGroups(groups);
    const lists = this.listsService.getLists();
    lists.forEach(list => {
      list.groupId === id ? list.groupId = '' : list.groupId
    })
    this.listsService.saveLists(lists);

  }

  deleteAllGroups(): void {
    this.storage.deleteSpecificKeyItems(this.localStorageKey);
    this.stateService.setState([]);
  }
}
