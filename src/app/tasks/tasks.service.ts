import {Task} from "./task.model";
import {Injectable} from "@angular/core";

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    new Task("Clean the fridge", "Also the freezer"),
    new Task("Make lunch", "Need to buy chicken."),];

  getTasks(): Task[] {
    return this.tasks.slice();
  }
}
