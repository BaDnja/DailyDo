import {Task} from "../shared/models/task.model";
import {Injectable} from "@angular/core";
import {DataService} from "../shared/services/data/data.service";
import {StateService} from "../shared/services/state/state.service";
import {LocalStorageKeysEnum} from "../shared/types/localStorageDataTypes.enum";

@Injectable({providedIn: "root"})
export class TasksService {
  private readonly localStorageKey: string = LocalStorageKeysEnum.tasks;
  private stateService: StateService<Task>;

  constructor(
    private dataService: DataService,
    stateService: StateService<Task>) {
    this.stateService = stateService;
    const initialTasks = this.getTasks();
    this.stateService.initializeState(initialTasks);
  }

  get tasks$() {
    return this.stateService.state$;
  }

  getNewId(tasks: any[]) {
    return String(tasks.reduce((max, task) => Math.max(max, Number(task.id)), 0) + 1);
  }

  getTasks(): Task[] {
    return this.dataService.getItems(this.localStorageKey);
  }

  saveTasks(tasks: Task[]): void {
    this.dataService.saveItems(this.localStorageKey, tasks);
    this.stateService.setState(tasks);
  }

  updateTask(updatedTask: Task) {
    const tasks = this.dataService.updateItem(this.getTasks(), updatedTask);
    this.saveTasks(tasks);
  }

  deleteTask(id: string) {
    const currentTasks = this.getTasks();
    const newTasks = this.dataService.deleteItem(currentTasks, id);
    this.saveTasks(newTasks);
  }

  removeAllTasksFromAllLists() {
    const tasks = this.getTasks();
    tasks.forEach(task => {
      task.listId = "";
    })
    this.saveTasks(tasks);
  }

  deleteAllTasks() {
    this.dataService.deleteAllItemsOfSpecificKey(this.localStorageKey);
    this.stateService.setState([]);
  }
}
