import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TasksService} from "../tasks/tasks.service";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  constructor(private tasksService: TasksService) {
  }

  clearData() {
    this.tasksService.clearTasks();
  }
}
