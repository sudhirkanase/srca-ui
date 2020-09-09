import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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

  private requests: string[] = [];

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req.url);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    if (this.requests.length === 0) {
      this.appSharedService.setIsLoading(false);
    }
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.requests.push(request.url);
    this.appSharedService.setIsLoading(true);

    // With hardcoded user name
    // request = request.clone({
    //   setHeaders: {
    //     Authorization: this.createBasicAuthStr()
    //   }
    // });
    if (this.authService.isUserAuthenticated() && this.authService.getAuthToken()) {
      request = request.clone({
        setHeaders: {
          'X-CSRF-TOKEN': this.authService.getAuthToken()
        }
      });
    }

    return next.handle(request)
      .pipe(
        tap((resp: HttpEvent<any>) => {
          if (resp instanceof HttpResponse)
            this.removeRequest(request);
        }, (err: HttpErrorResponse) => {
          this.removeRequest(request);
        }),
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
          return throwError(response);
        })
      );
  }

}
