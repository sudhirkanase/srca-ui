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
  actionDetails: any;

  constructor(
    private createTaskService: CreateTaskService,
    private route: ActivatedRoute,
    private router: Router,
    private createTaskSharedService: CreateTaskSharedService) { }

  ngOnInit() {

    this.getAccountNumber();

    this.taskColumns = [
      { field: 'action', header: '' },
      { field: 'id', header: 'ID' },
      { field: 'accountName', header: 'Account Name' },
      { field: 'requesterName', header: 'Requester Name' },
      { field: 'taskType', header: 'Task Type' },
      { field: 'dueDate', header: 'Due Date' },
    ];
    this.tasks = [];

    this.actionDetails = {
      accountNo: this.accountNumber,
      taskID: 0,
      actionType: 'ADD',
      actionName: null
    };

  }

  getTaskListByAccountNo() {
    if (!isNullOrUndefined(this.accountNumber)) {
      this.createTaskService.getTaskListByAccountNo(this.accountNumber).subscribe(taskListRes => {
        this.tasks = taskListRes;
      });
    }

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
    this.getTaskListByAccountNo();
  }

  // To get account details using account number
  getAccountDetails(): void {
    this.createTaskService.getAccountByAccountNumber(this.accountNumber).subscribe((account: Account) => {
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

  onViewIconClick(rowData: any) {
    const actionType = 'VIEW';
    const actionDetails: any = {
      accountNo: rowData.accountNo,
      taskID: rowData.id,
      actionType,
      actionName: rowData.taskType
    };
    if (rowData.taskType === 'Contact Center') {
      this.router.navigate(['action'], {
        state: { data: actionDetails },
        queryParams: { task: 'contact-center', type: actionType.toLowerCase() }
      });
    }
  }

}
