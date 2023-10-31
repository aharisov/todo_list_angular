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

  // booleans for alerts state
  success: boolean = false;
  taskComplete: boolean = false;
  taskReopened: boolean = false;
  hasDeadline: boolean = false;

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
    setTimeout(() => this.success = false, 1000);
  }

  onToggleComplete(id: number) {

    const task: Task | undefined = this.taskService.getById(id); 

    if (task) {

      if (task.done) {

        // show alert
        this.taskReopened = true;

        // hide alert after 1s
        setTimeout(() => this.taskReopened = false, 1000);

        task.done = false;
      } else {
        
        // show alert
        this.taskComplete = true;

        // hide alert after 1s
        setTimeout(() => this.taskComplete = false, 1000);

        task.done = true;
      }
    }
    
  }

  checkDate(date: string, done: any): string | undefined {

    // transform task date to timestamp
    const timestamp = Date.parse(date);
    // get time now
    const now = Date.now();
    
    // create date from now and add 3 days to it
    const newDate = new Date(now);
    newDate.setDate(newDate.getDate() + 3);

    // check if deadline passed and task did not closed
    if (now >= timestamp && !done) {
      
      // return class name for coloring table row
      return 'deadline';

    } else if (newDate.getTime() > timestamp && !done) { // check if task date is less then time now + 3 days
      
      // return class name for coloring table row
      return 'warn';

    } else {

      return '';
    }

  }
}

