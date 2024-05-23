import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {StorageService} from "../storage.service";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  constructor(private storage: StorageService) {
  }

  clearData() {
    this.storage.clearData();
  }
}
