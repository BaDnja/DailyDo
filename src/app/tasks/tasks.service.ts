import {Task} from "./task.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class TasksService {
  taskSelected: EventEmitter<Task> = new EventEmitter<Task>();
  private tasks: Task[] = [
    new Task("Clean the fridge", "Also the freezer"),
    new Task("Make lunch", "Need to buy chicken."),];

  getTasks(): Task[] {
    return this.tasks.slice();
  }
}
