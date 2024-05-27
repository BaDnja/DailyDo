import {Component, OnInit} from '@angular/core';
import {Task} from "../task.model";
import {TaskItemComponent} from "./task-item/task-item.component";
import {NgForOf} from "@angular/common";
import {TasksService} from "../tasks.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertTypeEnum} from "../../shared/components/alert/types/alertType.enum";
import {AlertService} from "../../shared/components/alert/alert.service";

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

  constructor(private tasksService: TasksService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.tasksService.tasks$.subscribe(tasks => {
      this.tasks = tasks;
    })

    this.tasks = this.tasksService.getTasks();
  }

  showSuccessMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.success,
      text: 'Item added'
    })
  }

  onAddNew() {
    if (!this.addNewTaskForm.invalid) {
      this.appendTask();
      this.addNewTaskForm.reset();
      this.showSuccessMessage();
    }
  }

  appendTask() {
    if (!this.addNewTaskForm.invalid) {
      const id = this.tasksService.getNewId(this.tasks);
      const title = this.addNewTaskForm.value.title!;
      const detail = this.addNewTaskForm.value.detail!.trim();
      const newTask = new Task(id, title, detail)
      this.tasks = [...this.tasks, newTask];
      this.saveTasks();
    }
  }

  saveTasks(): void {
    this.tasksService.saveTasks(this.tasks);
  }
}
