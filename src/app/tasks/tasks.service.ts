import {Task} from "./task.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    new Task("1", "Clean the fridge", "Also the freezer"),
    new Task("2", "Make lunch", "Need to buy chicken."),];

  getTasks(): Task[] {
    return this.tasks.slice();
  }
}
