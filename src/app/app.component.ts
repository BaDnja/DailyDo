import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {TopBarComponent} from "./top-bar/top-bar.component";
import {AlertComponent} from "./alert/alert.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TasksComponent, TopBarComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DailyDo';
}
