import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TasksService} from "../tasks.service";
import {Task} from "../task.model";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {update} from "@angular-devkit/build-angular/src/tools/esbuild/angular/compilation/parallel-worker";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  updateTaskForm!: FormGroup
  constructor(private route: ActivatedRoute, private tasksService: TasksService,
              private formBuilder: FormBuilder) {
  }

  getTaskStatus() {
    console.log(this.task.isDone)
    return this.task.isDone
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = routeParams.get('id');
    this.task = <Task>this.tasksService.getTasks().find((task) => task.id === taskIdFromRoute);

    this.updateTaskForm = this.formBuilder.nonNullable.group({
      title: [this.task.title, [Validators.required]],
      detail: this.task.detail,
      isDone: this.task.isDone
    })
  }

  onUpdate() {
    const updatedTask = {
      id: this.task.id,
      title: this.updateTaskForm.value.title,
      detail: this.updateTaskForm.value.detail,
      isDone: this.updateTaskForm.value.isDone,
      creationDatetime: this.task.creationDatetime
    }
    this.tasksService.updateTask(updatedTask)
  }

}
