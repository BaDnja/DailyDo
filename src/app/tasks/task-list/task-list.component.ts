import { Component, OnInit } from '@angular/core';
import {Task} from "../task.model";
import {TaskItemComponent} from "./task-item/task-item.component";
import {NgForOf} from "@angular/common";
import {TasksService} from "../tasks.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    TaskItemComponent,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  addNewTaskForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]],
    detail: ''
  });

  constructor(private tasksService: TasksService, private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.tasks = this.tasksService.getTasks();
  }

  onAddNew() {
    if (!this.addNewTaskForm.invalid) {
      const title = this.addNewTaskForm.value.title;
      const description = this.addNewTaskForm.value.detail;
      this.tasksService.appendTask(title!, description!);
      this.ngOnInit()
      this.addNewTaskForm.reset();
    }
  }
}

// TODO: Delete task
