import {Component} from '@angular/core';
import {RouterLink} from "@angular/router";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {NgIf} from "@angular/common";
import {StorageService} from "../shared/services/storage/storage.service";

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

  constructor(private storage: StorageService) {
  }

  onClearData() {
    this.showConfirmation = true;
  }

  onConfirmDeletion(confirm: boolean) {
    this.showConfirmation = false
    if (confirm) {
      this.clearData();
    }
  }

  clearData() {
    this.storage.clearData();
  }
}
