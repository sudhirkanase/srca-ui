import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastType } from '../shared/model/toast-type';

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  isLoadingSubject = new BehaviorSubject<boolean>(false);
  // To show error message on toast popup
  toastErrorMessageSubject = new Subject<ToastType>();

  constructor() { }

  getIsLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  setIsLoading(flag: boolean) {
    this.isLoadingSubject.next(flag);
  }

  setToastMessage(toastType: ToastType) {
    this.toastErrorMessageSubject.next(toastType);
  }

  getToastMessage(): Observable<ToastType> {
    return this.toastErrorMessageSubject.asObservable();
  }
}
