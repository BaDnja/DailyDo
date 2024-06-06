import {Routes} from '@angular/router';
import {TaskDetailComponent} from "./tasks/task-detail/task-detail.component";
import {TaskListComponent} from "./tasks/task-list/task-list.component";
import {ListsComponent} from "./lists/lists.component";
import {ListDetailComponent} from "./lists/list-detail/list-detail.component";
import {GroupsComponent} from "./groups/groups.component";
import {GroupDetailComponent} from "./groups/group-detail/group-detail.component";
import {SearchResultsComponent} from "./search-results/search-results.component";

export const routes: Routes = [
  {path: '', component: TaskListComponent},
  {path: 'tasks/:id', component: TaskDetailComponent},
  {path: 'lists', component: ListsComponent},
  {path: 'lists/:id', component: ListDetailComponent},
  {path: 'groups', component: GroupsComponent},
  {path: 'groups/:id', component: GroupDetailComponent},
  {path: 'search', component: SearchResultsComponent},
];
