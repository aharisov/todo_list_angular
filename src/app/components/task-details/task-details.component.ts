import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { TaskServiceService } from 'src/app/services/task-service.service';
import { Task } from 'src/app/interfaces/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  
  @Input() task?: Task;

  editForm = this.formBuilder.group({
    message: '',
    deadline: ''
  });

  error: boolean = false;
  successCreated: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskServiceService,
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    // console.log(this.task);
    console.log('init', this.getTask());
  }

  getTask(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));
    
    this.task = this.taskService.getById(id);

    this.editForm.value.message = this.task?.message;
    this.editForm.value.deadline = this.task?.deadline;

    // console.log('test', this.task);
  }

  saveTask(task: Task): void {

    this.taskService.createTask(task);

    this.successCreated = true;

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }

  goBack(): void {

    this.location.back();
  }

  onSubmit() {
    
    if (this.editForm.value.message && this.editForm.value.deadline) {
      
      // console.log(this.editForm.value);
      this.error = false;

      const currentDate = new Date();
      const timestamp = currentDate.getTime();

      const newTask: Task = {
        id: timestamp,
        message: this.editForm.value.message,
        deadline: this.editForm.value.deadline
      };

      this.saveTask(newTask);

    } else {
      
      // console.error('empty');
      this.error = true;

    }
    
  }
}
