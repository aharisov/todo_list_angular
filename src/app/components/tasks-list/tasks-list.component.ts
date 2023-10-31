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

  success: boolean = false;

  constructor(

    private taskService: TaskServiceService
  ) {}

  ngOnInit() {

    this.showTasks();
  }

  showTasks(): void {
    
    this.tasks = this.taskService.getAllTasks();
  }

  deleteTask(id: number): void {

    // delete task
    this.tasks = this.taskService.deleteTask(id); 

    // show alert
    this.success = true;

    // hide alert after 1s
    setTimeout(() => this.success = false, 800);
  }
}
