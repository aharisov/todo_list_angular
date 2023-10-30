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

    const task = TASKS.find(el => el.id === id);

    return task;
  }
}
