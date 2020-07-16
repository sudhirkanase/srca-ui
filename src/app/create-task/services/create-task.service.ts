import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Account } from './../model/Account';

@Injectable({
  providedIn: 'root'
})
export class CreateTaskService {

  constructor(private httpClient: HttpClient) { }

  searchAccounts(): Observable<Account[]> {
    return this.httpClient.get<Account[]>("assets/json/account-list.json");
  }

}
