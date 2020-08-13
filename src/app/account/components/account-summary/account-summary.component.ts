import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../../shared/model/Account';
import { AccountService } from '../../services/account.service';
import { AccountSharedService } from '../../services/account-shared.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'srca-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {
  accountNumber: number;
  accountDetails: Account;
  tasks: any[];
  actionDetails: any;

  constructor(
    private accountService: AccountService,
    private route: ActivatedRoute,
    private router: Router,
    private accountSharedService: AccountSharedService) { }

  ngOnInit() {

    this.getAccountNumber();

    this.actionDetails = {
      accountNo: this.accountNumber,
      taskID: 0,
      actionType: 'ADD',
      actionName: null
    };

  }

  getTaskListByAccountNo() {
    if (!isNullOrUndefined(this.accountNumber)) {
      this.accountService.getTaskListByAccountNo(this.accountNumber).subscribe(taskListRes => {
        this.tasks = taskListRes;
      });
    }

  }

  // To get the account number from state property of route
  getAccountNumber(): void {

    if (isNullOrUndefined(history.state.data)) {
      this.accountSharedService.getAccountNumber.subscribe(accountNo => this.accountNumber = accountNo);
    } else {
      this.accountNumber = history.state.data;
    }

    // Set Account no to in shared service
    this.accountSharedService.setAccountNumber(this.accountNumber);

    this.getAccountDetails();
    this.getTaskListByAccountNo();
  }

  // To get account details using account number
  getAccountDetails(): void {
    this.accountService.getAccountByAccountNumber(this.accountNumber).subscribe((account: Account) => {
      this.accountDetails = account;
    });
  }

  /**
   * Click handler for collapsible actions menu
   */
  actionClick(actionItem: HTMLElement): void {
    const dropdownContainerElement: HTMLDivElement = (actionItem.nextElementSibling as HTMLDivElement);
    const actionIcon = actionItem.querySelector('i');

    if (dropdownContainerElement.className.includes('active')) {
      dropdownContainerElement.className = 'dropdown-container';
      actionIcon.className = 'pi pi-caret-down';
    } else {
      dropdownContainerElement.className += ' active';
      actionIcon.className = 'pi pi-caret-up';
    }
  }

  handleBackBtnClick(): void {
    this.router.navigate(['./../search'], { relativeTo: this.route });
  }

  createNewTask(action: string, urlFragment: string) {
    this.actionDetails.actionName = action;
    this.router.navigate([`../${urlFragment}`], {
      state: { data: this.actionDetails },
      queryParams: { action: 'create' },
      relativeTo: this.route
    });
  }
}
