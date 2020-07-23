import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'ad-account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: { type: 'AD' }
  },
  {
    path: 'ifs-account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: { type: 'IFS' }
  },
  {
    path: 'pb-account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: { type: 'PB' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTaskRoutingModule { }
