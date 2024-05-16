import {Component, Input, OnInit} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {Task} from "../../task.model";
import {TasksService} from "../../tasks.service";

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent implements OnInit {
  @Input() task!: Task;
  taskCheckbox: FormControl = new FormControl();

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.taskCheckbox.valueChanges.subscribe(value => {
      const task = this.tasksService.getTasks().find(task => task == this.task);
      if (task) {
        task.isDone = value;
      }
    })
  }

  onSelected() {
    this.tasksService.taskSelected.emit(this.task);
  }
}
