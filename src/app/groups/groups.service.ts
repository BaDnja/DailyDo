import {Injectable} from '@angular/core';
import {ListsService} from "../lists/lists.service";
import {Group} from "../shared/models/group.model";
import {DataService} from "../shared/services/data/data.service";
import {StateService} from "../shared/services/state/state.service";
import {LocalStorageKeysEnum} from "../shared/types/localStorageDataTypes.enum";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private readonly localStorageKey: string = LocalStorageKeysEnum.groups;
  private stateService: StateService<Group>;

  constructor(
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
    const currentGroups = this.getGroups();
    const newGroups = this.dataService.deleteItem(currentGroups, id);
    this.saveGroups(newGroups);
    // Set groupId to empty string on every list associated with deleted group
    const lists = this.listsService.getLists();
    lists.forEach(list => {
      list.groupId === id ? list.groupId = '' : list.groupId
    })
    this.listsService.saveLists(lists);

  }

  deleteAllGroups(): void {
    this.dataService.deleteAllItemsOfSpecificKey(this.localStorageKey);
    this.stateService.setState([]);
  }
}
