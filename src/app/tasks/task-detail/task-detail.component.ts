import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TasksService} from "../tasks.service";
import {Task} from "../../shared/models/task.model";
import {NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AlertTypeEnum} from "../../shared/components/alert/types/alertType.enum";
import {AlertService} from "../../shared/components/alert/alert.service";
import {ConfirmationDialogComponent} from "../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {List} from "../../shared/models/list.model";
import {ListsService} from "../../lists/lists.service";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    ConfirmationDialogComponent,
    NgForOf
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css',

})
export class TaskDetailComponent implements OnInit {
  task!: Task;
  lists: List[] = [];
  updateTaskForm!: FormGroup
  showConfirmation = false;

  constructor(private route: ActivatedRoute,
              private tasksService: TasksService,
              private formBuilder: FormBuilder,
              private router: Router,
              private alertService: AlertService,
              private listsService: ListsService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = routeParams.get('id');
    this.task = <Task>this.tasksService.getTasks().find((task) => task.id === taskIdFromRoute);

    this.updateTaskForm = this.formBuilder.nonNullable.group({
      title: [this.task.title, [Validators.required]],
      detail: this.task.detail,
      isDone: this.task.isDone,
      listId: this.task.listId,
    })

    this.lists = this.listsService.getLists();
  }

  showAfterUpdateMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.success,
      text: 'Item updated'
    })
  }

  showAfterDeleteMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.info,
      text: 'Item deleted'
    })
  }

  onUpdate() {
    if (!this.updateTaskForm.invalid) {
      const updatedTask = {
        id: this.task.id,
        title: this.updateTaskForm.value.title,
        detail: this.updateTaskForm.value.detail,
        isDone: this.updateTaskForm.value.isDone,
        creationDatetime: this.task.creationDatetime,
        listId: this.updateTaskForm.value.listId,
      }
      this.tasksService.updateTask(updatedTask);
      this.showAfterUpdateMessage();
    }
  }


  onConfirmDeletion(confirm: boolean) {
    this.showConfirmation = false;
    if (confirm) {
      this.tasksService.deleteTask(this.task.id);
      this.router.navigate(['/'])
      this.showAfterDeleteMessage();
    }
  }

  onDelete() {
    this.showConfirmation = true;
  }
}
