import {Routes} from '@angular/router';
import {TaskDetailComponent} from "./tasks/task-detail/task-detail.component";
import {TaskListComponent} from "./tasks/task-list/task-list.component";
import {ListsComponent} from "./lists/lists.component";
import {ListDetailComponent} from "./lists/list-detail/list-detail.component";

export const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'tasks/:id', component: TaskDetailComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'lists/:id', component: ListDetailComponent},

];
