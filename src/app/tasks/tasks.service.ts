import {Task} from "./task.model";
import {Injectable} from "@angular/core";
import {StorageService} from "../shared/services/storage/storage.service";
import {DataService} from "../shared/services/data/data.service";
import {StateService} from "../shared/services/state/state.service";

@Injectable({providedIn: "root"})
export class TasksService {
  private readonly localStorageKey: string = 'tasks';
  private stateService: StateService<Task>;

  constructor(private storage: StorageService,
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
    this.stateService.setState([]);
  }
}
