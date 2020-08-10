import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Account } from './../../model/Account';
import { AccountService } from './../../services/account.service';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { ToastType } from 'src/app/shared/model/toast-type';

@Component({
  selector: 'srca-account-search',
  templateUrl: './account-search.component.html',
  styleUrls: ['./account-search.component.scss']
})
export class AccountSearchComponent implements OnInit {

  accountNumber: string;
  accountName: string;
  cols: any[];
  accounts: Account[];
  accountType: string;
  message: any;
  accountSearchForm: FormGroup;

  constructor(private route: ActivatedRoute, private accountService: AccountService,
    private appSharedService: AppSharedService) { }
  ngOnInit() {
    this.accountSearchForm = new FormGroup({
      accountNumber: new FormControl('', Validators.required),
      accountName: new FormControl('', Validators.required),
    });

    this.accountType = this.route.snapshot.data.type;

    this.cols = [
      { field: 'select', header: 'Select Account' },
      { field: 'accountNumber', header: 'Account Number' },
      { field: 'accountName', header: 'Account Name' }
    ];
    this.accounts = [];
  }

  search(searchForm: any): void {
    const accountType = {
      accountNumber: searchForm.accountNumber,
      accountName: searchForm.accountName
    };

    this.accountService.searchAccounts(accountType).subscribe((searchedAccounts: Account[]) => {
      this.accounts = searchedAccounts;
      this.message = '';
    }, (error) => {
      this.message = error;
      const toastType = new ToastType();
      toastType.message = this.message;
      toastType.summary = 'Error';
      toastType.severity = 'error';
      this.appSharedService.setToastMessage(toastType);
      this.accounts = [];
    });
  }
}
