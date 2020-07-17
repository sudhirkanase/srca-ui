import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskDetailComponent } from './contact-center/task-detail/task-detail.component';
import { DocumentComponent } from './contact-center/document/document.component';


const routes: Routes = [
  {
    path: ':accountNumber/cost-center/task-detail',
    component: TaskDetailComponent
  },
  {
    path: ':accountNumber/cost-center/document',
    component: DocumentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActionsRoutingModule { }
