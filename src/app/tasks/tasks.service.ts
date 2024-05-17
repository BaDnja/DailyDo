import {Task} from "./task.model";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks.slice();
  }

  updateTask(updatedTask: Task) {
    const taskIndex = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex] = updatedTask;
    }
  }

  appendTask(title: string, detail: string) {
    const newId = String(this.tasks.length + 1);
    const newTask: Task = new Task(newId, title, detail)
    this.tasks.push(newTask);
  }
}
