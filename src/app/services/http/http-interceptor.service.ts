import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from '../auth/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }
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
    return next.handle(request);
  }

}
