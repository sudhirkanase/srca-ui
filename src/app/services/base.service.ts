import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import {
  TASK_MANAGEMENT_SERVICES_URL,
  LOGGEDIN_USER_INFO,
  AUTH_KEY
} from './../../environments/environment';
import { catchError } from 'rxjs/operators';
import { UserInfoBean } from '../beans/userinfo-bean';

interface HttpOptions {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  observe?: 'body';
  params?: HttpParams | { [param: string]: string | string[]; };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  taskManagementServiceUrl = `${TASK_MANAGEMENT_SERVICES_URL}`;
  loggedinUserInfo = `${LOGGEDIN_USER_INFO}`;
  authKey = `${AUTH_KEY}`;

  private sessionExpired: boolean;

  constructor(private http: HttpClient) { }

  public get(url: string): Observable<any> {
    return this.http.get(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  public post(url: string, requestBody: any, options?: HttpOptions): Observable<any> {
    if (!options) {
      options = {};
    }

    return this.http.post(url, requestBody, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public put(url: string, requestBody: any, options?: HttpOptions): Observable<any> {
    if (!options) {
      options = {};
    }

    return this.http.put(url, requestBody, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public delete(url: string, options?: HttpOptions): Observable<any> {
    if (!options) {
      options = {};
    }

    return this.http.delete(url, options)
      .pipe(
        catchError(this.handleError)
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

  private handleError(error: HttpErrorResponse) {
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
