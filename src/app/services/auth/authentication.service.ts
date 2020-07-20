import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { TASK_MANAGEMENT_SERVICES_URL, LOGGEDIN_USER_INFO, AUTH_KEY } from 'src/app/app.constants';
import { UserInfoBean } from 'src/app/beans/userinfo-bean';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.http.post<UserInfoBean>(`${TASK_MANAGEMENT_SERVICES_URL}/authenticate`, { username, password })
            .pipe(map(user => {
                // check for authentication token
                if (user.authToken) {
                    this.setUserLogginInfo(user);
                    this.currentUserSubject.next(user);
                    return user;
                }
                else {
                    throw new Error('Login Failed');
                }
            }),
                catchError(this.handleError<any>('authentication', [])));
    }

    setUserLogginInfo(user: UserInfoBean) {
        // Set some session information values
        sessionStorage.setItem(LOGGEDIN_USER_INFO, JSON.stringify(user));
        sessionStorage.setItem(AUTH_KEY, user.authToken);
    }

    removeUserLogginInfo() {
        sessionStorage.removeItem(LOGGEDIN_USER_INFO);
        sessionStorage.removeItem(AUTH_KEY);
    }

    isUserAuthenticated(): boolean {
        if (sessionStorage.getItem(AUTH_KEY)) {
            return true;
        }
        return false;
    }

    getLoggedInUser(): UserInfoBean {
        return JSON.parse(sessionStorage.getItem(LOGGEDIN_USER_INFO));
    }

    getAuthToken() {
        return sessionStorage.getItem(AUTH_KEY);
    }

    logout() {
        // remove user from local storage and set current user to null
        //localStorage.removeItem('currentUser');
        this.removeUserLogginInfo();
        this.currentUserSubject.next(null);
    }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}