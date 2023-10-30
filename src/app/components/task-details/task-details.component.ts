import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TaskServiceService } from 'src/app/services/task-service.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  @Input() task?: Task;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private location: Location
  ) {}

  ngOnInit(): void {
    
    // console.log(this.task);
    this.getTask();
  }

  getTask(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.task = this.taskService.getById(id);

    // console.log('test', this.task);
  }

  saveTask(): void {

  }

  goBack(): void {

    this.location.back();
  }
}
