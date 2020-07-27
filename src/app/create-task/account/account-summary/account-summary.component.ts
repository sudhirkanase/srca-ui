import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CreateTaskService } from '../../services/create-task.service';
import { Account } from './../../model/Account';
import { isNullOrUndefined } from 'util';
import { CreateTaskSharedService } from '../../services/create-task-shared.service';

@Component({
  selector: 'srca-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {

  accountNumber: number;
  accountDetails: Account;
  tasks: any[];
  taskColumns: any[];
  contactCenterDetails: any;

  constructor(
    private createTaskService: CreateTaskService,
    private route: ActivatedRoute,
    private router: Router,
    private createTaskSharedService: CreateTaskSharedService) { }

  ngOnInit() {

    this.getAccountNumber();

    this.taskColumns = [
      { field: 'id', header: 'ID' },
      { field: 'accountName', header: 'Account Name' },
      { field: 'requesterName', header: 'Requester Name' },
      { field: 'taskType', header: 'Task Type' },
      { field: 'dueDate', header: 'Due Date' },
    ];
    this.tasks = [];

    this.contactCenterDetails = {
      accountNo: this.accountNumber,
      taskID: 0,
      accountAction: 'Add'
    };
  }

  // To get the account number from state property of route
  getAccountNumber(): void {

    if (isNullOrUndefined(history.state.data)) {
      this.createTaskSharedService.getAccountNumber.subscribe(accountNo => this.accountNumber = accountNo);
    } else {
      this.accountNumber = history.state.data;
    }

    // Set Account no to in shared service
    this.createTaskSharedService.setAccountNumber(this.accountNumber);

    this.getAccountDetails();
  }

  // To get account details using account number
  getAccountDetails(): void {

    this.createTaskService.getAccountByAccountNumber(this.accountNumber).subscribe((account: Account) => {
      this.accountDetails = account;
    });

    if (this.accountDetails && this.accountDetails.accountNumber) {
      this.createTaskService.getTasksByAccountNumber(this.accountDetails.accountNumber)
        .subscribe((tasks: any) => {
          this.tasks = tasks.filter((task: any) => task.taskType === 'Contact Center');
        });
    }
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

}
