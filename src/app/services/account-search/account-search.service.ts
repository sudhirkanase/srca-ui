import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppSharedService } from '../app-shared.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountSearchService extends BaseService {

  constructor(http: HttpClient, appSharedService: AppSharedService) {
    super(http, appSharedService);
  }

  searchAccounts(account: any): Observable<Account[]> {
    return this.post(`${this.taskManagementServiceUrl}/searchAccounts`, account).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(JSON.stringify(error.error.errorMessage));
  }

}
