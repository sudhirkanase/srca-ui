import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/routeguard/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'create/ad-account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: { type: 'AD' }
  },
  {
    path: 'create/ifs-account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: { type: 'IFS' }
  },
  {
    path: 'create/pb-account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
    data: { type: 'PB' }
  },
  {
    path: 'action',
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
  }

  // Lazy temprory as its landing page it should be eager loading
  // {path: '',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
