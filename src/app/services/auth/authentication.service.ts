import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInfoBean } from 'src/app/beans/userinfo-bean';
import { BaseService } from '../base.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService<UserInfoBean> {

    private currentUserSubject: BehaviorSubject<any>;
    public currentUser: Observable<any>;

    constructor(http: HttpClient) {
        super(http);
        this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue() {
        return this.currentUserSubject.value;
    }

    login(username, password) {
        return this.post<UserInfoBean>(`${this.taskManagementServiceUrl}/authenticate`, { username, password })
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
            }));
    }

    setUserLogginInfo(user: UserInfoBean) {
        // Set some session information values
        sessionStorage.setItem(this.loggedinUserInfo, JSON.stringify(user));
        sessionStorage.setItem(this.authKey, user.authToken);
    }

    removeUserLogginInfo() {
        sessionStorage.removeItem(this.loggedinUserInfo);
        sessionStorage.removeItem(this.authKey);
    }

    getAuthToken() {
        return sessionStorage.getItem(this.authKey);
    }

    logout() {
        // remove user from local storage and set current user to null
        //localStorage.removeItem('currentUser');
        this.removeUserLogginInfo();
        this.currentUserSubject.next(null);
    }
}