import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../model/Account';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { ToastType } from 'src/app/shared/model/toast-type';
import { AccountSearchService } from 'src/app/services/account-search/account-search.service';

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
  @Input() contactCenterSearch = false;
  @Output() addAccount: EventEmitter<any> = new EventEmitter();

  constructor(private route: ActivatedRoute, private accountService: AccountSearchService,
    private appSharedService: AppSharedService, private router: Router) { }

  ngOnInit() {
    this.accountSearchForm = new FormGroup({
      accountNumber: new FormControl('', Validators.required),
      accountName: new FormControl('', Validators.required),
    });

    console.log('Check boolean', this.contactCenterSearch);
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

    this.accountService.searchAccounts(accountType).subscribe((searchedAccounts: any) => {
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

  selectAccount(rowData): void {
    if (this.contactCenterSearch) {
      this.addAccount.emit(rowData);
      this.accounts = [];
    } else {
      this.router.navigate(['../create/ad-account/summary'], {
        state: { data: rowData.accountNumber }
      });
    }
  }
}
