import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSearchComponent } from '../shared/components/account-search/account-search.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';
import { TaskContainerComponent } from '../tasks/task-container/task-container.component';


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
    component: TaskContainerComponent
  },
  {
    path: 'acct-maintenance',
    component: TaskContainerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
