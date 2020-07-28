import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

const users = [{ id: 1, firstName: 'Manganna', lastName: 'Dodlo', fullName: 'Manganna Dodlo', username: 'dodlo', password: 'dodlo' },
{ id: 2, firstName: 'Sudhir', lastName: 'Kanase', fullName: 'Sudhir Kanase', username: 'kanase', password: 'kanase' },
{ id: 3, firstName: 'Bhushan', lastName: 'Asolkar', fullName: 'Bhushan Asolkar', username: 'asolkar', password: 'asolkar' },
{ id: 4, firstName: 'Heta', lastName: 'Shah', fullName: 'Heta Shah', username: 'shah', password: 'shah' },
{ id: 5, firstName: 'Priyanka', lastName: 'Pawar', fullName: 'Priyanka Pawar', username: 'pawar', password: 'pawar' }];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                default:
                    return next.handle(request);
            }
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) { return error('Username or password is incorrect'); }
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                fullName: user.fullName,
                token: 'fake-jwt-token'
            });
        }

        // helper functions

        function ok(responseBody?: any) {
            return of(new HttpResponse({ status: 200, body: responseBody }));
        }

        function error(message) {
            return throwError({ error: { message } });
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};
