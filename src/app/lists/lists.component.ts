import {Component, OnInit} from '@angular/core';
import {ListsService} from "./lists.service";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {List} from "./list.model";
import {AlertService} from "../shared/components/alert/alert.service";
import {AlertTypeEnum} from "../shared/components/alert/types/alertType.enum";
import {NgForOf} from "@angular/common";
import {TaskItemComponent} from "../tasks/task-list/task-item/task-item.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-lists',
  standalone: true,
  imports: [
    NgForOf,
    ReactiveFormsModule,
    TaskItemComponent,
    RouterLink
  ],
  templateUrl: './lists.component.html',
  styleUrl: './lists.component.css'
})
export class ListsComponent implements OnInit {
  lists: List[] = [];

  addNewListForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]]
  });

  constructor(private listsService: ListsService,
              private formBuilder: FormBuilder,
              private alertService: AlertService) {}

  ngOnInit() {
    this.listsService.lists$.subscribe(lists => {
      this.lists = lists
    })

    this.lists = this.listsService.getLists();
  }

  showSuccessMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.success,
      text: 'List added'
    })
  }

  onAddNew() {
    if (!this.addNewListForm.invalid) {
      this.appendList();
      this.addNewListForm.reset();
      this.showSuccessMessage();
    }
  }

  appendList() {
    if (!this.addNewListForm.invalid) {
      const id = this.listsService.getNewId(this.lists);
      const title = this.addNewListForm.value.title!;
      const newList = new List(id, title);
      this.lists = [...this.lists, newList];
      this.saveLists();
    }
  }

  saveLists(): void {
    this.listsService.saveLists(this.lists);
  }

}
