import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionsRoutingModule } from './actions-routing.module';
import { ContactCenterComponent } from './contact-center/contact-center.component';
import { TaskDetailComponent } from './contact-center/task-detail/task-detail.component';
import { DocumentComponent } from './contact-center/document/document.component';
import { EditorModule } from 'primeng/editor';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    ContactCenterComponent,
    TaskDetailComponent,
    DocumentComponent
  ],
  imports: [
    CommonModule,
    ActionsRoutingModule,
    EditorModule,
    RadioButtonModule,
    TabViewModule,
    CardModule,
    DropdownModule
  ]
})
export class ActionsModule { }
