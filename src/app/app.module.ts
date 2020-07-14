import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MenuBarComponent } from './header/menu-bar/menu-bar.component';
import { TMTPrimengModule } from './shared/tmtprimeng.module';
import { HomeComponent } from './home/home.component';
import { MyTaskListComponent } from './home/task/my-task-list/my-task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { TaskComponent } from './home/task/task.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuBarComponent,
    HomeComponent,
    MyTaskListComponent,
    DashboardComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    TMTPrimengModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
