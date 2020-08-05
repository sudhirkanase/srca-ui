import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

import { AccountRoutingModule } from './account-routing.module';
import { AccountSearchComponent } from './account-search/account-search.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountDetailsComponent } from './account-summary/account-details/account-details.component';
import { TasksModule } from 'src/app/tasks/tasks.module';

@NgModule({
  declarations: [AccountSearchComponent, AccountSummaryComponent, AccountDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PanelModule,
    TabViewModule,
    ButtonModule,
    TasksModule,
    AccountRoutingModule,
    ReactiveFormsModule
  ]
})
export class AccountModule { }
