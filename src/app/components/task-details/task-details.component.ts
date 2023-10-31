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
  
  // get current task
  @Input() task?: Task;

  // create form for editing or creating task
  editForm = this.formBuilder.group({
    message: '',
    deadline: ''
  });

  // variables for error and success messages
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
    
    // show current task
    this.getTask();
  }

  getTask(): void {

    // get id from url
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // find task by that id
    this.task = this.taskService.getById(id);

    // get data from form inputs and pass it to form builder
    this.editForm.value.message = this.task?.message;
    this.editForm.value.deadline = this.task?.deadline;

    // console.log('test', this.task);
  }

  saveTask(task: Task): void {

    // add task to tasks array
    this.taskService.createTask(task);
    // show success message
    this.successCreated = true;

    // redirect to tasks page after 1 sec
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 1000);
  }

  goBack(): void {

    // got to the previous page
    this.location.back();
  }

  onSubmit() {
    
    // check if form fileds are not empty
    if (this.editForm.value.message && this.editForm.value.deadline) {
      
      // remove error message
      this.error = false;

      // create timestamp for task id
      const currentDate = new Date();
      const timestamp = currentDate.getTime();

      // create new task object
      const newTask: Task = {
        id: timestamp,
        message: this.editForm.value.message,
        deadline: this.editForm.value.deadline
      };

      // pass new task to save method
      this.saveTask(newTask);

    } else {
      
      // show error message if form fields are empty
      this.error = true;
    }
    
  }
}
