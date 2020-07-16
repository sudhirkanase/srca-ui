import { Component, OnInit } from '@angular/core';

import { CreateTaskService } from '../../services/create-task.service';
import { Account } from './../../model/Account';

@Component({
  selector: 'tmt-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.scss']
})
export class AccountSearchComponent implements OnInit {

  accountNumber: string;
  accountName: string;
  cols: any[];
  accounts: Account[];

  constructor(private createTaskService: CreateTaskService) { }

  ngOnInit() {
    this.cols = [
      { field: 'select', header: 'Select Account' },
      { field: 'accountNumber', header: 'Account Number' },
      { field: 'accountName', header: 'Account Name' }
    ];
    this.accounts = [];
  }

  search(searchForm: any): void {
    this.createTaskService.searchAccounts().subscribe((searchedAccounts: Account[]) => {
      this.accounts = searchedAccounts;
    });
  }

}
