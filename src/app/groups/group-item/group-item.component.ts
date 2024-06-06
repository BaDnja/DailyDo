import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Group} from "../../shared/models/group.model";

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './group-item.component.html',
  styleUrl: './group-item.component.css'
})
export class GroupItemComponent {
  @Input() group!: Group;
}
