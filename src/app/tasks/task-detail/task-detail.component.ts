import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TasksService} from "../tasks.service";
import {Task} from "../task.model";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent implements OnInit {
  task: Task | undefined;
  constructor(private route: ActivatedRoute, private tasksService: TasksService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = routeParams.get('id');

    this.task = this.tasksService.getTasks().find((task) => task.id === taskIdFromRoute);
  }

}
