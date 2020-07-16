import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './auth/auth.guard'


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
    path: 'create',
    loadChildren: () => import('./create-task/create-task.module').then(m => m.CreateTaskModule)
  }

  // Lazy temprory as its landing page it should be eager loading
  // {path: '',  loadChildren: () => import('./home/home.module').then(m => m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
