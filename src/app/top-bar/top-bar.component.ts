import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TasksService} from "../tasks/tasks.service";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterLink,
    ConfirmationDialogComponent,
    NgIf
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {
  showConfirmation: boolean = false;

  constructor(private tasksService: TasksService) {
  }

  onClearData() {
    this.showConfirmation = true;
  }

  onConfirmDeletion(confirm: boolean) {
    this.showConfirmation = false
    if (confirm) {
      this.clearData();
    }
  }

  clearData() {
    this.tasksService.clearTasks();
  }
}
