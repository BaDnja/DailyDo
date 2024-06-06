import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {List} from "../../shared/models/list.model";

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  @Input() list!: List;

}
