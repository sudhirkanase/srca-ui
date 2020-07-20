import { Component, OnInit } from '@angular/core';

import { TaskManagementService } from '../../services/task-management.service';
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

  constructor(private taskManagementService: TaskManagementService) { }

  ngOnInit() {
    this.cols = [
      { field: 'select', header: 'Select Account' },
      { field: 'accountNumber', header: 'Account Number' },
      { field: 'accountName', header: 'Account Name' }
    ];
    this.accounts = [];
  }

  search(searchForm: any): void {
    this.taskManagementService.searchAccounts().subscribe((searchedAccounts: Account[]) => {
      this.accounts = searchedAccounts;
    });
  }

}
