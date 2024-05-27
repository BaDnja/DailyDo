import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../shared/services/storage/storage.service";
import {List} from "./list.model";
import {TasksService} from "../tasks/tasks.service";
import {DataService} from "../data.service";

@Injectable({
  providedIn: 'root'
})
export class ListsService {
  private listsSubject = new BehaviorSubject<any[]>(this.getLists());
  private readonly localStorageKey: string = 'lists';

  lists$ = this.listsSubject.asObservable();

  constructor(private storage: StorageService,
              private tasksService: TasksService,
              private dataService: DataService) {
  }

  getNewId(lists: any[]): string {
    return String(lists.reduce((max, list) => Math.max(max, Number(list.id)), 0) + 1);
  }

  getLists(): List[] {
    return this.dataService.getItems(this.localStorageKey);
  }

  saveLists(lists: any[]): void {
    this.storage.setItem(this.localStorageKey, JSON.stringify(lists));
    this.listsSubject.next(lists);
  }

  updateList(updatedList: List) {
    this.dataService.updateItem(this.getLists(), updatedList, this.saveLists.bind(this));
  }

  deleteList(id: string) {
    const lists = this.getLists();
    const listIndex = lists.findIndex(list => list.id === id);
    if (listIndex !== -1) {
      lists.splice(listIndex, 1);
    }
    this.saveLists(lists);
    const tasks = this.tasksService.getTasks();
    tasks.forEach(task => {
      task.listId === id ? task.listId = '' : task.listId
    })
    this.tasksService.saveTasks(tasks);

  }

  deleteAllLists() {
    this.storage.deleteSpecificKeyItems(this.localStorageKey);
    this.listsSubject.next([]);
  }
}
