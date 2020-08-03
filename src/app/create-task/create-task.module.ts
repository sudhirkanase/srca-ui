import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateTaskRoutingModule } from './create-task-routing.module';
import { CreateTaskService } from './services/create-task.service';
import { CreateTaskSharedService } from './services/create-task-shared.service';
import { UploadFileService } from './services/upload-file.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateTaskRoutingModule
  ],
  providers: [
    CreateTaskService,
    UploadFileService,
    CreateTaskSharedService
  ]
})
export class CreateTaskModule { }
