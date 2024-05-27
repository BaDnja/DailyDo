import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {ConfirmationDialogComponent} from "../shared/components/confirmation-dialog/confirmation-dialog.component";
import {NgIf} from "@angular/common";
import {LocalStorageKeysEnum} from "../shared/types/localStorageDataTypes.enum";
import {DataService} from "../shared/services/data/data.service";
import {TasksService} from "../tasks/tasks.service";
import {ListsService} from "../lists/lists.service";
import {GroupsService} from "../groups/groups.service";

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
  dataTypeToDelete!: LocalStorageKeysEnum;

  constructor(private tasksService: TasksService,
              private listsService: ListsService,
              private groupsService: GroupsService,
              private dataService: DataService,
              private router: Router) {
  }

  onClearData(dataType: LocalStorageKeysEnum) {
    this.dataTypeToDelete = dataType;
    this.showConfirmation = true;
  }


  onConfirmDeletion(confirm: boolean) {
    this.showConfirmation = false
    if (confirm) {
      this.clearData(this.dataTypeToDelete);
    }
  }

  clearData(dataType: LocalStorageKeysEnum) {
    switch (dataType) {
      case LocalStorageKeysEnum.tasks:
        this.tasksService.deleteAllTasks();
        this.router.navigate(['/']);
        break;
      case LocalStorageKeysEnum.lists:
        this.listsService.deleteAllLists();
        this.tasksService.removeAllTasksFromAllLists();
        this.router.navigate(['/lists']);
        break;
      case LocalStorageKeysEnum.groups:
        this.groupsService.deleteAllGroups();
        this.listsService.removeAllListsFromAllGroups();
        this.router.navigate(['/groups']);
        break;
      case LocalStorageKeysEnum.all:
        this.dataService.deleteAllItems();
        this.router.navigate(['/']);
        break;
    }
  }

  protected readonly LocalStorageKeysEnum = LocalStorageKeysEnum;
}
