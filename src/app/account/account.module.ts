import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

import { AccountRoutingModule } from './account-routing.module';
import { AccountSharedService } from './services/account-shared.service';
import { AccountService } from './services/account.service';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { AccountTasksComponent } from './components/account-tasks/account-tasks.component';
import { TasksModule } from '../tasks/tasks.module';
import { SharedModule } from '../shared/components/shared.module';

@NgModule({
  declarations: [AccountSummaryComponent, AccountDetailsComponent, AccountTasksComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PanelModule,
    TabViewModule,
    ButtonModule,
    ReactiveFormsModule,
    TasksModule,
    AccountRoutingModule,
    SharedModule
  ],
  providers: [AccountService, AccountSharedService],
})
export class AccountModule { }
