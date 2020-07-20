import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { mergeMap, take, filter, map } from 'rxjs/operators';

import { Account } from './../model/Account';

@Injectable({
  providedIn: 'root'
})
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

  getDocumentDetails(): Observable<any>{
    return this.httpClient.get<any>('assets/json/document-details.json')
  }
}
