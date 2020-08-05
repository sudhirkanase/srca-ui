import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskContainerComponent } from './task-container/task-container.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: TaskContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
