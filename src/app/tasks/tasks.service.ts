import {Task} from "./task.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks.slice();
  }

  appendTask(title: string, detail: string) {
    const newId= String(this.tasks.length + 1);
    const newTask: Task = new Task(newId, title, detail)
    this.tasks.push(newTask);
  }
}
