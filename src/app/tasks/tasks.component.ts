import {Component} from '@angular/core';
import {TaskListComponent} from "./task-list/task-list.component";
import {TasksService} from "./tasks.service";

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

}
