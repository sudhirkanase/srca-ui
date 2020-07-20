import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

import { TASK_MANAGEMENT_SERVICES_URL, LOGGEDIN_USER_INFO, AUTH_KEY } from './../../environments/environment';
import { catchError } from 'rxjs/operators';

type HTTP_OPTIONS = {
  headers?: HttpHeaders | { [header: string]: string | string[]; };
  observe?: "body";
  params?: HttpParams | { [param: string]: string | string[]; };
  reportProgress?: boolean;
  responseType?: "json";
  withCredentials?: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  taskManagementServiceUrl = `${TASK_MANAGEMENT_SERVICES_URL}`;
  loggedinUserInfo = `${LOGGEDIN_USER_INFO}`;
  authKey = `${AUTH_KEY}`;

  constructor(private http: HttpClient) { }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  public post<T>(url: string, requestBody: any, options?: HTTP_OPTIONS): Observable<T> {
    if (!options) {
      options = {};
    }

    return this.http.post<T>(url, requestBody, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public put<T>(url: string, requestBody: any, options?: HTTP_OPTIONS): Observable<T> {
    if (!options) {
      options = {};
    }

    return this.http.put<T>(url, requestBody, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  public delete<T>(url: string, options?: HTTP_OPTIONS): Observable<T> {
    if (!options) {
      options = {};
    }

    return this.http.delete<T>(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }

  // public handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {

  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead

  //     // TODO: better job of transforming error for user consumption
  //     console.log(`${operation} failed: ${error.message}`);

  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  // TODO: send the error to remote logging infrastructure
  // TODO: better job of transforming error for user consumption
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // TODO: send the error to remote logging infrastructure
      console.error('An error occurred:', error.error.message);
    } else {
      // TODO: better job of transforming error for user consumption
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something went wrong; please try again later.');
  };

}
