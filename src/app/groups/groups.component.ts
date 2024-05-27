import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {Group} from "./group.model";
import {GroupsService} from "./groups.service";
import {AlertService} from "../shared/components/alert/alert.service";
import {AlertTypeEnum} from "../shared/components/alert/types/alertType.enum";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.css'
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  addNewGroupForm = this.formBuilder.nonNullable.group({
    title: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder,
              private groupsService: GroupsService,
              private alertService: AlertService) {
  }

  ngOnInit() {
    this.groupsService.groups$.subscribe(groups => {
      this.groups = groups;
    });
    this.groups = this.groupsService.getGroups();
  }

  showSuccessMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.success,
      text: 'Group added'
    })
  }

  onAddNew() {
    if (!this.addNewGroupForm.invalid) {
      this.appendGroup();
      this.addNewGroupForm.reset();
      this.showSuccessMessage();
    }
  }

  appendGroup() {
    if (!this.addNewGroupForm.invalid) {
      const id = this.groupsService.getNewId(this.groups);
      const title = this.addNewGroupForm.value.title!;
      const newGroup = new Group(id, title);
      this.groups = [...this.groups, newGroup];
      this.saveGroups();
    }
  }

  saveGroups(): void {
    this.groupsService.saveGroups(this.groups);
  }
}
