import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../shared/services/storage/storage.service";
import {List} from "./list.model";
import {TasksService} from "../tasks/tasks.service";
import {DataService} from "../shared/services/data/data.service";
import {StateService} from "../shared/services/state/state.service";

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private readonly localStorageKey: string = 'lists';
  private stateService: StateService<List>;

  constructor(private storage: StorageService,
              private tasksService: TasksService,
              private dataService: DataService,
              stateService: StateService<List>) {
    this.stateService = stateService;
    const initialLists = this.getLists();
    this.stateService.initializeState(initialLists);
  }

  get lists$() {
    return this.stateService.state$;
  }

  getNewId(lists: any[]): string {
    return String(lists.reduce((max, list) => Math.max(max, Number(list.id)), 0) + 1);
  }

  getLists(): List[] {
    return this.dataService.getItems(this.localStorageKey);
  }

  saveLists(lists: List[]): void {
    this.dataService.saveItems(this.localStorageKey, lists);
    this.stateService.setState(lists);
  }

  updateList(updatedList: List) {
    const lists = this.dataService.updateItem(this.getLists(), updatedList);
    this.saveLists(lists);
  }

  deleteList(id: string) {
    const currentLists = this.getLists();
    const newLists = this.dataService.deleteItem(currentLists, id);
    this.saveLists(newLists);
    // Set listId to empty string on every task associated with deleted list
    const tasks = this.tasksService.getTasks();
    tasks.forEach(task => {
      task.listId === id ? task.listId = '' : task.listId
    })
    this.tasksService.saveTasks(tasks);
  }

  deleteAllLists() {
    this.dataService.deleteAllItemsOfSpecificKey(this.localStorageKey);
    this.stateService.setState([]);
  }
}
