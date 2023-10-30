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
}
