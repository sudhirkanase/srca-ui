import { CommunicationComponent } from './components/communication/communication.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import {CheckboxModule} from 'primeng/checkbox';
import {MultiSelectModule} from 'primeng/multiselect';


import { TasksRoutingModule } from './tasks-routing.module';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskSummaryComponent } from './components/task-summary/task-summary.component';
import { TaskAccountDetailsComponent } from './components/task-account-details/task-account-details.component';
import { DocumentComponent } from './components/document/document.component';
import { TaskDetailsHostDirective } from './directives/task-details-host.directive';
import { ContactCenterTaskComponent } from './components/contact-center-task/contact-center-task.component';
import { TasksService } from './services/tasks.service';
import { UploadFileService } from './services/upload-file.service';
import { TaskComponentFactory } from './factory/task-component.factory';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { AuditComponent } from './components/audit/audit.component';
import { AccountMaintenanceTaskComponent } from './components/account-maintenance-task/account-maintenance-task.component';

@NgModule({
  declarations: [
    TaskContainerComponent,
    TaskSummaryComponent,
    TaskAccountDetailsComponent,
    DocumentComponent,
    TaskDetailsHostDirective,
    ContactCenterTaskComponent,
    CommunicationComponent,
    AuditComponent,
    AccountMaintenanceTaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    PanelModule,
    TabViewModule,
    TableModule,
    DropdownModule,
    ProgressBarModule,
    InputMaskModule,
    RadioButtonModule,
    EditorModule,
    InputTextModule,
    TasksRoutingModule,
    DialogModule,
    CalendarModule,
    CheckboxModule,
    MultiSelectModule,
    DialogModule
  ],
  entryComponents: [ContactCenterTaskComponent, AccountMaintenanceTaskComponent],
  exports: [TaskContainerComponent, TaskSummaryComponent, TaskAccountDetailsComponent],
  providers: [TasksService, UploadFileService, TaskComponentFactory]
})
export class TasksModule { }
