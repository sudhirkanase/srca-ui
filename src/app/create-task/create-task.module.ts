import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTaskRoutingModule } from './create-task-routing.module';
import { TaskManagementService } from './services/task-management.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateTaskRoutingModule
  ],
  providers: [
    TaskManagementService
  ]
})
export class CreateTaskModule { }
