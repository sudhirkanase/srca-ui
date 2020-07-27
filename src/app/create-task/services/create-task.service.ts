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

  searchAccounts(account): Observable<Account[]> {
    return this.get(`${this.taskManagementServiceUrl}/searchAccounts/${account.accountNumber}/${account.accountName}`);
  }

  getAccountByAccountNumber(accountNumber: number): Observable<Account> {
    return this.get(`${this.taskManagementServiceUrl}/getAccount/${accountNumber}`);
  }

  getTasksByAccountNumber(accountNumber: number): Observable<any> {
    return this.get('assets/json/task-list.json');
  }

  getDocumentDetails(): Observable<any> {
    return this.get('assets/json/document-details.json');
  }

  saveContactCenterTaskDetails(taskId: number, taskDetails: any): Observable<boolean> {
    // TODO make the actual API call
    // return mock success
    console.log(`taskId: ${taskId}, taskDetails: `, taskDetails);
    return of(true);
  }

  getContactDetail(requestBody): Observable<any> {
    return this.post(`${this.taskManagementServiceUrl}/contactCenterDetail`, requestBody);
  }

}
