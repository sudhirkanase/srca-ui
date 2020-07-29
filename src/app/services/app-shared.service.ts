import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  isLoadingSubject = new BehaviorSubject<boolean>(false);
  // To show error message on toast popup
  toastErrorMessageSubject = new Subject<string>();

  constructor() { }

  getIsLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  setIsLoading(flag: boolean) {
    console.log('isFlagUpdating?', flag);
    this.isLoadingSubject.next(flag);
  }

  setToastErrorMessage(errorMessage: string) {
    this.toastErrorMessageSubject.next(errorMessage);
  }

  getToastErrorMessage(): Observable<any> {
    return this.toastErrorMessageSubject.asObservable();
  }
}
