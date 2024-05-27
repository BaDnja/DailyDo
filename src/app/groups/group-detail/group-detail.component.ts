import {Component, OnInit} from '@angular/core';
import {ConfirmationDialogComponent} from "../../shared/components/confirmation-dialog/confirmation-dialog.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Group} from "../group.model";
import {AlertService} from "../../shared/components/alert/alert.service";
import {GroupsService} from "../groups.service";
import {AlertTypeEnum} from "../../shared/components/alert/types/alertType.enum";
import {List} from "../../lists/list.model";
import {ListsService} from "../../lists/lists.service";

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [
    ConfirmationDialogComponent,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './group-detail.component.html',
  styleUrl: './group-detail.component.css'
})
export class GroupDetailComponent implements OnInit {
  group!: Group;
  lists!: List[];
  updateGroupForm!: FormGroup;
  showConfirmation: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private alertService: AlertService,
              private groupsService: GroupsService,
              private listsService: ListsService) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const groupIdFromRoute = routeParams.get('id');
    this.group = <Group>this.groupsService.getGroups().find(group => group.id === groupIdFromRoute);
    this.lists = this.listsService.getLists().filter(list => list.groupId === this.group.id);

    this.updateGroupForm = this.formBuilder.nonNullable.group({
      title: [this.group.title, [Validators.required]],
    });
  }

  showAfterUpdateMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.success,
      text: 'Group updated'
    });
  }

  showAfterDeleteMessage() {
    this.alertService.setAlert({
      type: AlertTypeEnum.info,
      text: 'Group deleted'
    });
  }

  onUpdate() {
    if (!this.updateGroupForm.invalid) {
      const updatedGroup: Group = {
        id: this.group.id,
        title: this.updateGroupForm.value.title
      }
      this.groupsService.updateGroup(updatedGroup);
      this.showAfterUpdateMessage();
    }
  }

  onConfirmDeletion(confirm: boolean) {
    this.showConfirmation = false;
    if (confirm) {
      this.groupsService.deleteGroup(this.group.id);
      this.router.navigate(['/groups']);
      this.showAfterDeleteMessage();
    }
  }

  onDelete() {
    this.showConfirmation = true;
  }
}
