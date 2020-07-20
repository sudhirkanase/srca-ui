import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSearchComponent } from './account-search/account-search.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { ContactCenterComponent } from '../actions/contact-center/contact-center.component';


const routes: Routes = [
  {
    path: 'search',
    component: AccountSearchComponent
  },
  {
    path: 'summary',
    component: AccountSummaryComponent,
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'contact-center',
    component: ContactCenterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
