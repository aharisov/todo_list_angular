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

    const task = TASKS.find(el => el.id === id);

    if (task) {

      task.message = taskModified.message;
      task.deadline = taskModified.deadline;
    }
    
  }

  deleteTask() {

  }
}
