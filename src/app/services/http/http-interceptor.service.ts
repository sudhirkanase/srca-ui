import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';
import { AppSharedService } from './../app-shared.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
    private appSharedService: AppSharedService,
    private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // With hardcoded user name
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: this.createBasicAuthStr()
    //   }
    // });
    this.appSharedService.setIsLoading(true);
    if (this.authService.isUserAuthenticated() && this.authService.getAuthToken()) {
      request = request.clone({
        setHeaders: {
          'X-CSRF-TOKEN': this.authService.getAuthToken()
        }
      });
    }
    return next.handle(request)
      .pipe(
        tap(() => this.appSharedService.setIsLoading(false)),
        catchError(response => {
          let errorMessage = '';
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            this.authService.logout();
            localStorage.removeItem('currentUser');

            // If request is from any page other than login, that means token has expired.
            // Redirect to login page
            if (!request.url.includes('authenticate')) {
              this.authService.setSessionExpired(true);
              this.router.navigate(['login']);
            } else {
              return throwError(new Error('Username or password is invalid.'));
            }
          }
          // setting error message to show toast message popup
          if (!isNullOrUndefined(response) && !isNullOrUndefined(response.error)
            && response.error instanceof ErrorEvent) {
            errorMessage = response.error.message;
          } else if (!isNullOrUndefined(response) && !isNullOrUndefined(response.error)) {
            errorMessage = response.error.errorMessage;
          }

          if (errorMessage !== '') {
            this.appSharedService.setToastErrorMessage(errorMessage);
          }
          return throwError(response);
        }));
  }

}
