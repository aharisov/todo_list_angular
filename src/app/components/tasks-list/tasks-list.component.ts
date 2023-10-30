import { Component, OnInit } from '@angular/core';

import { Task } from 'src/app/interfaces/task';
import { TaskServiceService } from 'src/app/services/task-service.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent {

  tasks: Task[] = [];

  constructor(

    private taskService: TaskServiceService
  ) {}

  ngOnInit() {

    this.showTasks();
  }

  showTasks(): void {
    
    this.tasks = this.taskService.getAllTasks();
  }
}
