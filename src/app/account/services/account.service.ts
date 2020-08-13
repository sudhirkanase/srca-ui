import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Account } from '../../shared/model/Account';
import { BaseService } from 'src/app/services/base.service';
import { AppSharedService } from 'src/app/services/app-shared.service';


@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  constructor(http: HttpClient, appSharedService: AppSharedService) {
    super(http, appSharedService);
  }

  // searchAccounts(account: any): Observable<Account[]> {
  //   return this.post(`${this.taskManagementServiceUrl}/searchAccounts`, account).pipe(
  //     catchError(this.errorHandler)
  //   );
  // }
  // errorHandler(error: HttpErrorResponse) {
  //   return throwError(JSON.stringify(error.error.errorMessage));
  // }

  getAccountByAccountNumber(accountNumber: number): Observable<Account> {
    return this.get(`${this.taskManagementServiceUrl}/getAccount/${accountNumber}`);
  }

  getTaskListByAccountNo(accountNo): Observable<any> {
    return this.post(`${this.taskManagementServiceUrl}/getTaskList`, accountNo);
  }
}
