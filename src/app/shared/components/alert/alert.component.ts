import {Component, OnInit} from '@angular/core';
import {AlertInterface} from "./types/alert.interface";
import {AlertTypeEnum} from "./types/alertType.enum";
import {CommonModule, NgClass} from "@angular/common";
import {AlertService} from "./alert.service";

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [
    NgClass,
    CommonModule
  ],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  alert?: AlertInterface;
  timeoutId?: number;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.getAlert().subscribe((alert) => {
      this.alert = alert
      this.resetTimer();
    })
  }

  showAlert(type: AlertTypeEnum, text: string) {
    this.alertService.setAlert({
      type,
      text: text,
    })
  }

  resetTimer(): void {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => {
      this.alert = undefined;
    }, 3000)
  }
}
