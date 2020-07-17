import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSearchComponent } from './account-search/account-search.component';
import { AccountSummaryComponent } from './account-summary/account-summary.component';
import { AccountSummaryResolverService } from '../services/account-summary-resolver.service';


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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
