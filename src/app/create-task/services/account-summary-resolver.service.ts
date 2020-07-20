import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { Account } from './../model/Account';
import { CreateTaskService } from './create-task.service';

@Injectable({
  providedIn: 'root'
})
export class AccountSummaryResolverService implements Resolve<Account[]> {

  constructor(
    private createTaskService: CreateTaskService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Account[]> {
    console.log('paramMap: ', route.paramMap);
    console.log('routeSnapshot: ', route);
    let accountNumber = parseInt(route.paramMap.get('accountNumber'), 10);

    return this.createTaskService.getAccountByAccountNumber(accountNumber).pipe(
      take(1),
      map((accounts: Account[]) => {
        if (accounts && accounts.length) {
          return accounts;
        } else { // id not found

          let routePath = '';
          if (route.data.type === 'AD') {
            routePath = 'create/ad-account/search';
          } else {
            routePath = 'create/ifs-account/search';
          }
          this.router.navigate([routePath]);

          return [];
        }
      })
    );
  }
}
