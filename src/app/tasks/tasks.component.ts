import { Component } from '@angular/core';
import {TaskListComponent} from "./task-list/task-list.component";
import {TasksService} from "./tasks.service";
import {Task} from "./task.model";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    TaskListComponent
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  providers: [TasksService],
})
export class TasksComponent {
  selectedTask!: Task;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.taskSelected
      .subscribe(
        (task: Task) => {
          this.selectedTask = task;
          // console.log(this.selectedTask);
        }
      )
  }

}
