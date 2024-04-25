import { Component } from '@angular/core';
import {Task} from "../task.model";
import {TaskItemComponent} from "./task-item/task-item.component";
import {NgForOf} from "@angular/common";
import {TasksService} from "../tasks.service";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TaskItemComponent,
    NgForOf
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
  }
}
