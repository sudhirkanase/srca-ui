import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TasksRoutingModule } from './tasks-routing.module';
import { TaskContainerComponent } from './task-container/task-container.component';
import { TaskSummaryComponent } from './components/task-summary/task-summary.component';
import { TaskAccountDetailsComponent } from './components/task-account-details/task-account-details.component';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DocumentComponent } from './components/document/document.component';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { TaskDetailsHostDirective } from './directives/task-details-host.directive';
import { ContactCenterDetailsComponent } from './components/contact-center-details/contact-center-details.component';
import { InputMaskModule } from 'primeng/inputmask';
import { RadioButtonModule } from 'primeng/radiobutton';
import { EditorModule } from 'primeng/editor';
import { InputTextModule } from 'primeng/inputtext';
import { ContactCenterTaskComponent } from './components/contact-center-task/contact-center-task.component';


@NgModule({
  declarations: [
    TaskContainerComponent,
    TaskSummaryComponent,
    TaskAccountDetailsComponent,
    DocumentComponent,
    ContactCenterDetailsComponent,
    TaskDetailsHostDirective,
    ContactCenterTaskComponent,
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
    TasksRoutingModule
  ],
  entryComponents: [ContactCenterDetailsComponent, ContactCenterTaskComponent],
  exports: [TaskContainerComponent, TaskSummaryComponent, TaskAccountDetailsComponent]
})
export class TasksModule { }
