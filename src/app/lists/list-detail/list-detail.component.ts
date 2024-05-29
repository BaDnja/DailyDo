import {Component, OnInit} from '@angular/core';
import {ConfirmationDialogComponent} from "../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {List} from "../../shared/models/list.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ListsService} from "../lists.service";
import {AlertService} from "../../shared/components/alert/alert.service";
import {AlertTypeEnum} from "../../shared/components/alert/types/alertType.enum";
import {Task} from "../../shared/models/task.model";
import {TasksService} from "../../tasks/tasks.service";
import {Group} from "../../shared/models/group.model";
import {GroupsService} from "../../groups/groups.service";

@Component({
  selector: 'app-list-detail',
  standalone: true,
  imports: [
    ConfirmationDialogComponent,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './list-detail.component.html',
  styleUrl: './list-detail.component.css'
})
export class ListDetailComponent implements OnInit {
  list!: List;
  tasks!: Task[];
  groups: Group[] = [];
  updateListForm!: FormGroup;
  showConfirmation: boolean = false;

  constructor(private route: ActivatedRoute,
              private listService: ListsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private tasksService: TasksService,
              private groupsService: GroupsService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const listIdFromRoute = routeParams.get('id');
    this.list = <List>this.listService.getLists().find(list => list.id === listIdFromRoute);

    this.updateListForm = this.formBuilder.nonNullable.group({
      title: [this.list.title, [Validators.required]],
      groupId: this.list.groupId
    });
    this.tasks = this.tasksService.getTasks().filter(task => task.listId === this.list.id);
    this.groups = this.groupsService.getGroups();
  }

  showAfterUpdateMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.success,
      text: 'List updated'
    })
  }

  showAfterDeleteMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.info,
      text: 'List deleted'
    })
  }

  onUpdate() {
    if (!this.updateListForm.invalid) {
      const updatedList: List = {
        id: this.list.id,
        title: this.updateListForm.value.title,
        groupId: this.updateListForm.value.groupId,
      }
      this.listService.updateList(updatedList);
      this.showAfterUpdateMessage();
    }
  }

  onConfirmDeletion(confirm: boolean) {
    this.showConfirmation = false;
    if (confirm) {
      this.listService.deleteList(this.list.id);
      this.router.navigate(['/lists']);
      this.showAfterDeleteMessage();
    }
  }

  onDelete() {
    this.showConfirmation = true;
  }
}
