import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSharedService {

  isLoadingSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  getIsLoading(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  setIsLoading(flag: boolean) {
    this.isLoadingSubject.next(flag);
  }
}
