import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class CreateTaskSharedService {

  private accountNumber = new BehaviorSubject(0);
  getAccountNumber = this.accountNumber.asObservable();

  constructor() { }

  setAccountNumber(accountNumber) {
    this.accountNumber.next(accountNumber);
  }
}
