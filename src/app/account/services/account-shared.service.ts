import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountSharedService {
  private accountNumber = new BehaviorSubject(0);
  getAccountNumber = this.accountNumber.asObservable();

  constructor() { }

  setAccountNumber(accountNumber: any): void {
    this.accountNumber.next(accountNumber);
  }
}
