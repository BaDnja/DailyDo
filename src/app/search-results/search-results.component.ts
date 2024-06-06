import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TasksService} from "../tasks/tasks.service";
import {ListsService} from "../lists/lists.service";
import {GroupsService} from "../groups/groups.service";
import {Group} from "../shared/models/group.model";
import {List} from "../shared/models/list.model";
import {Task} from '../shared/models/task.model';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {TaskItemComponent} from "../tasks/task-list/task-item/task-item.component";

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    TaskItemComponent
  ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  filteredResults$!: { tasks: Task[]; lists: List[]; groups: Group[]; };
  queryParam: string = '';

  constructor(private tasksService: TasksService,
              private listsService: ListsService,
              private groupsService: GroupsService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const tasks = this.tasksService.getTasks();
    const lists = this.listsService.getLists();
    const groups = this.groupsService.getGroups();
    this.route.queryParams.subscribe(params => {
      this.queryParam = params['q'] || '';
      this.filteredResults$ = this.filterData(tasks, lists, groups, this.queryParam);
    });
  }


  private filterData(tasks: Task[], lists: List[], groups: Group[], query: string) {
    if (query.length == 0) {
      return {tasks: tasks, lists: lists, groups: groups};
    }
    const lowerQuery: string = query.toLowerCase();
    const filteredTasks: Task[] = tasks.filter(task => task.title.toLowerCase().includes(lowerQuery));
    const filteredLists: List[] = lists.filter(list => list.title.toLowerCase().includes(lowerQuery));
    const filteredGroups: Group[] = groups.filter(group => group.title.toLowerCase().includes(lowerQuery));
    return {tasks: filteredTasks, lists: filteredLists, groups: filteredGroups};
  }
}
