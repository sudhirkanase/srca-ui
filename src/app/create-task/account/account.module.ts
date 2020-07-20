import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TableModule } from 'primeng/table';
import { PanelModule } from 'primeng/panel';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

import { AccountRoutingModule } from './account-routing.module';
import { AccountSearchComponent } from './account-search/account-search.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountDetailsComponent } from './account-summary/account-details/account-details.component';
import { ActionsModule } from '../actions/actions.module';

@NgModule({
  declarations: [AccountSearchComponent, AccountSummaryComponent, AccountDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    PanelModule,
    TabViewModule,
    ButtonModule,
    ActionsModule,
    AccountRoutingModule
  ]
})
export class AccountModule { }
