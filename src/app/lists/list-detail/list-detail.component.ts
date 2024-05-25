import {Component, OnInit} from '@angular/core';
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {List} from "../list.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ListsService} from "../lists.service";
import {AlertService} from "../../alert/alert.service";
import {AlertTypeEnum} from "../../alert/types/alertType.enum";
import {Task} from "../../tasks/task.model";
import {TasksService} from "../../tasks/tasks.service";

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
  updateListForm!: FormGroup;
  showConfirmation: boolean = false;

  constructor(private route: ActivatedRoute,
              private listService: ListsService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private tasksService: TasksService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const listIdFromRoute = routeParams.get('id');
    this.list = <List>this.listService.getLists().find(list => list.id === listIdFromRoute);

    this.updateListForm = this.formBuilder.nonNullable.group({
      title: [this.list.title, [Validators.required]]
    });
    this.tasks = this.tasksService.getTasks().filter(task => task.listId === this.list.id);
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
      const updatedList = {
        id: this.list.id,
        title: this.updateListForm.value.title,
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
