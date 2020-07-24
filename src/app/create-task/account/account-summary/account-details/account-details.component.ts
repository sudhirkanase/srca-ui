import { Component, OnInit, Input } from '@angular/core';

import { Account } from './../../../model/Account';

@Component({
  selector: 'srca-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  @Input('accountDetails') accountDetails: Account;

  constructor() { }

  ngOnInit() {
  }

}
