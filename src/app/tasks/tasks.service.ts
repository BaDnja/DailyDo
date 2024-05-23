import {Task} from "./task.model";
import {Injectable} from "@angular/core";
import {StorageService} from "../storage.service";

@Injectable({providedIn: "root"})
export class TasksService {
  private tasks: Task[] = [];
  private readonly localStorageKey = "tasks";

  constructor(private storage: StorageService) {
  }

  getTasks(): Task[] {
    return this.storage.getItem(this.localStorageKey);
  }

  saveTasks() {
    this.storage.setItem(this.localStorageKey, JSON.stringify(this.tasks));
  }

  updateTask(updatedTask: Task) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;
    }
    this.saveTasks();
  }

  appendTask(title: string, detail: string) {
    const newId = String(this.tasks.length + 1);
    const newTask: Task = new Task(newId, title, detail)
    this.tasks.push(newTask);
    this.saveTasks();
  }

  deleteTask(id: string) {
    const tasks = this.getTasks();
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1)
    }
    this.saveTasks();
  }
}
