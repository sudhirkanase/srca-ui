import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from './../model/Account';

@Injectable()
export class CreateTaskService {

  constructor(private httpClient: HttpClient) { }

  searchAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>('assets/json/account-list.json');
  }

  getAccountByAccountNumber(accountNumber: number): Observable<Account[]> {
    return this.httpClient.get<Account[]>('assets/json/account-list.json')
      .pipe(
        map(accounts => accounts.filter((account: Account) => account.accountNumber === accountNumber))
      );
  }

  getTasksByAccountNumber(accountNumber: number): Observable<any> {
    return this.httpClient.get('assets/json/task-list.json');
  }
}
