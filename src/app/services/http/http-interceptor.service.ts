import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler) {
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
      .pipe(catchError(err => {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authService.logout();
          localStorage.removeItem('currentUser');

          // If request is from any page other than login, that means token has expired.
          // Redirect to login page
          if (!request.url.includes('authenticate')) {
            this.router.navigate(['login']);
          } else {
            return throwError(new Error('Username or password is invalid.'));
          }
        }

        return throwError(err);
      }));
  }

}
