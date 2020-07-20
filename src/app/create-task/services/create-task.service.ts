import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from '../model/Account';
import { BaseService } from 'src/app/services/base.service';

@Injectable()
export class CreateTaskService extends BaseService<any> {

  constructor(http: HttpClient) {
    super(http);
  }

  searchAccounts(): Observable<Account[]> {
    return this.get<Account[]>('assets/json/account-list.json');
  }

  getAccountByAccountNumber(accountNumber: number): Observable<Account[]> {
    return this.get<Account[]>('assets/json/account-list.json')
      .pipe(
        map(accounts => accounts.filter((account: Account) => account.accountNumber === accountNumber))
      );
  }

  getTasksByAccountNumber(accountNumber: number): Observable<any> {
    return this.get<any>('assets/json/task-list.json');
  }

  getDocumentDetails(): Observable<any> {
    return this.get<any>('assets/json/document-details.json')
  }

}
