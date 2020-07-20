import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSearchComponent } from './account-search/account-search.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountSummaryResolverService } from '../services/account-summary-resolver.service';
import { ContactCenterComponent } from '../actions/contact-center/contact-center.component';


const routes: Routes = [
  {
    path: 'search',
    component: AccountSearchComponent
  },
  {
    path: ':accountNumber/summary',
    component: AccountSummaryComponent,
    resolve: {
      accounts: AccountSummaryResolverService
    }
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: ':accountNumber/contact-center',
    component: ContactCenterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
