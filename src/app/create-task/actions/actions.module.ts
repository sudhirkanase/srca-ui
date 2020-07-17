import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ContactCenterComponent } from './contact-center/contact-center.component';
import { TaskDetailComponent } from './contact-center/task-detail/task-detail.component';
import { DocumentComponent } from './contact-center/document/document.component';
import { TMTPrimengModule } from 'src/app/shared/tmtprimeng.module';

@NgModule({
  declarations: [
    ContactCenterComponent,
    TaskDetailComponent,
    DocumentComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    TMTPrimengModule
  ]
})
export class ActionsModule { }
