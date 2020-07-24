import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyTaskListComponent } from './task/my-task-list/my-task-list.component';
import { TaskComponent } from './task/task.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { TMTPrimengModule } from '../shared/tmtprimeng.module';
import { HomeService } from './services/home.service';

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
  providers: [HomeService],
})
export class HomeModule { }
