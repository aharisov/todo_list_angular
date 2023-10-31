import { Injectable } from '@angular/core';

import { Task } from '../interfaces/task';
import { TASKS } from '../mock-tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  constructor() { }

  getAllTasks(): Task[] {

    return TASKS;
  }

  getById(id: number): Task | undefined {

    // find task by id and return it
    const task = TASKS.find(el => el.id === id);

    return task;
  }

  createTask(task: Task): void {

    // push new task to tasks array
    TASKS.push(task);
  }

  updateTask(id: number, taskModified: Task): void {

    // find task
    const task = this.getById(id);

    if (task) {

      // modify task properties
      task.message = taskModified.message;
      task.deadline = taskModified.deadline;
    }
    
  }

  deleteTask(id: number): Task[] {

    // find task index in array
    const task = TASKS.findIndex(el => el.id === id);
    // remove task from array
    TASKS.splice(task, 1);
    
    return TASKS;
  }
}
