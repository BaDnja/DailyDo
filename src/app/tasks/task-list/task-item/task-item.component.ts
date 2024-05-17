import {Component, Input, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Task} from "../../task.model";
import {TasksService} from "../../tasks.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  taskCheckbox!: FormControl

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.taskCheckbox = new FormControl(this.task.isDone);
    this.taskCheckbox.valueChanges.subscribe(value => {
      this.task.isDone = value;
      this.tasksService.updateTask(this.task);
    })
  }
}
