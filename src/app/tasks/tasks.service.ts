import {Task} from "./task.model";
import {Injectable} from "@angular/core";
import {StorageService} from "../shared/services/storage/storage.service";
import {BehaviorSubject} from "rxjs";
import {DataService} from "../data.service";

@Injectable({providedIn: "root"})
export class TasksService {
  private tasksSubject = new BehaviorSubject<any[]>(this.getTasks());
  private readonly localStorageKey: string = 'tasks';

  tasks$ = this.tasksSubject.asObservable();

  constructor(private storage: StorageService,
              private dataService: DataService) {
  }

  getNewId(tasks: any[]) {
    return String(tasks.reduce((max, task) => Math.max(max, Number(task.id)), 0) + 1);
  }

  getTasks(): Task[] {
    return this.storage.getItem(this.localStorageKey);
  }

  saveTasks(tasks: any[]): void {
    this.storage.setItem(this.localStorageKey, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  updateTask(updatedTask: Task) {
    this.dataService.updateItem(this.getTasks(), updatedTask, this.saveTasks.bind(this));
  }

  deleteTask(id: string) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1)
    }
    this.saveTasks(tasks);
  }

  deleteAllTasks() {
    this.storage.deleteSpecificKeyItems(this.localStorageKey);
    this.tasksSubject.next([]);
  }
}
