import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { TaskDetailsComponent } from './components/task-details/task-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { path: 'tasks', component: TasksListComponent },
  { path: 'tasks/details', component: TaskDetailsComponent },
  { path: 'tasks/details/:id', component: TaskDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
