import {Task} from "./task.model";
import {Injectable} from "@angular/core";
import {StorageService} from "../shared/services/storage/storage.service";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class TasksService {
  private tasksSubject = new BehaviorSubject<any[]>(this.getTasks());
  private readonly localStorageKey: string = 'tasks';

  tasks$ = this.tasksSubject.asObservable();

  constructor(private storage: StorageService) {
  }

  getTasks(): Task[] {
    return this.storage.getItem(this.localStorageKey);
  }

  saveTasks(tasks: any[]): void {
    this.storage.setItem(this.localStorageKey, JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  updateTask(updatedTask: Task) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = updatedTask;
    }
    this.saveTasks(tasks);
  }

  deleteTask(id: string) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      tasks.splice(taskIndex, 1)
    }
    this.saveTasks(tasks);
  }

  clearTasks() {
    this.storage.clearData();
    this.tasksSubject.next([]);
  }
}
