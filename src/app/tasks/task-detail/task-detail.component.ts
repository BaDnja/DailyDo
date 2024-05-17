import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TasksService} from "../tasks.service";
import {Task} from "../task.model";
import {NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  updateTaskForm!: FormGroup

  constructor(private route: ActivatedRoute,
              private tasksService: TasksService,
              private formBuilder: FormBuilder,
              private router: Router) {
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
    this.tasksService.updateTask(updatedTask);
  }

  onDelete() {
    this.tasksService.deleteTask(this.task.id);
    this.router.navigate(['/'])
  }

}
