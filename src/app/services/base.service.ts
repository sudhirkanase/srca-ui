import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import {
  TASK_MANAGEMENT_SERVICES_URL,
  LOGGEDIN_USER_INFO,
  AUTH_KEY
} from './../../environments/environment';
import { catchError, map } from 'rxjs/operators';
import { UserInfoBean } from '../beans/userinfo-bean';
import { AppSharedService } from './app-shared.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  taskManagementServiceUrl = `${TASK_MANAGEMENT_SERVICES_URL}`;
  loggedinUserInfo = `${LOGGEDIN_USER_INFO}`;
  authKey = `${AUTH_KEY}`;

  private sessionExpired: boolean;

  constructor(private http: HttpClient, private appSharedService: AppSharedService) { }

  public get(url: string): Observable<any> {
    this.appSharedService.setIsLoading(true);
    return this.http.get(url)
      .pipe(
        map(this.handleResponse.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  public post(url: string, requestBody: any, options?: any): Observable<any> {
    if (!options) {
      options = {};
    }

    this.appSharedService.setIsLoading(true);
    return this.http.post(url, requestBody, options)
      .pipe(
        map(this.handleResponse.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  public put(url: string, requestBody: any, options?: any): Observable<any> {
    if (!options) {
      options = {};
    }

    this.appSharedService.setIsLoading(true);
    return this.http.put(url, requestBody, options)
      .pipe(
        map(this.handleResponse.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  public delete(url: string, options?: any): Observable<any> {
    if (!options) {
      options = {};
    }

    this.appSharedService.setIsLoading(true);
    return this.http.delete(url, options)
      .pipe(
        map(this.handleResponse.bind(this)),
        catchError(this.handleError.bind(this))
      );
  }

  // user authentication related methods
  isUserAuthenticated(): boolean {
    if (sessionStorage.getItem(this.authKey)) {
      return true;
    }
    return false;
  }

  isSessionExpired(): boolean {
    return this.sessionExpired;
  }

  setSessionExpired(value: boolean): void {
    this.sessionExpired = value;
  }

  getLoggedInUser(): UserInfoBean {
    return JSON.parse(sessionStorage.getItem(this.loggedinUserInfo));
  }

  private handleResponse(response: any) {
    this.appSharedService.setIsLoading(false);
    return response;
  }

  private handleError(error: HttpErrorResponse) {
    this.appSharedService.setIsLoading(false);
    if (error.error instanceof ErrorEvent) {
      // TODO: send the error to remote logging infrastructure
      console.error('An error occurred:', error.error.message);
    } else {
      // TODO: better job of transforming error for user consumption
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}, ` +
        `message was: ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

}
