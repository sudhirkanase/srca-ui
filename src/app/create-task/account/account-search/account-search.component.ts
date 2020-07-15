import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tmt-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.scss']
})
export class AccountSearchComponent implements OnInit {

  accountNumber: string;
  accountName: string;
  cols: any[];
  accounts: any[];

  constructor() { }

  ngOnInit() {
    this.cols = [
      { field: 'select', header: 'Select Account' },
      { field: 'accountNumber', header: 'Account Number' },
      { field: 'accountName', header: 'Account Name' }
    ];
    this.accounts = [];
  }

  search(searchForm: any): void {
    console.log('form values: ', searchForm);
    this.accounts = [
      { accountNumber: 11231100, accountName: '11231100 ACCOUNT NAME' },
      { accountNumber: 11233300, accountName: '11233300 ACCOUNT NAME' },
      { accountNumber: 112351, accountName: '112351 ACCOUNT NAME' },
      { accountNumber: 11235300, accountName: '11235300 ACCOUNT NAME' }
    ];
  }

}
