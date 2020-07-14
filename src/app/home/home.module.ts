import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { MyTaskListComponent } from './task/my-task-list/my-task-list.component';
import { TaskComponent } from './task/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { TMTPrimengModule } from '../shared/tmtprimeng.module';

@NgModule({
  declarations: [
    DashboardComponent,
    TaskComponent,
    MyTaskListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    TMTPrimengModule
  ],
  providers: [],
})
export class HomeModule { }
