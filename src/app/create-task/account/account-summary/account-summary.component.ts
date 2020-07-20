import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CreateTaskService } from './../../services/create-task.service';
import { Account } from './../../model/Account';
import { map } from 'rxjs/operators';

@Component({
  selector: 'tmt-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {

  accountNumber: number;
  accountDetails: Account;
  tasks: any[];
  taskColumns: any[];

  constructor(
    private createTaskService: CreateTaskService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.taskColumns = [
      { field: 'id', header: 'ID' },
      { field: 'accountName', header: 'Account Name' },
      { field: 'requesterName', header: 'Requester Name' },
      { field: 'taskType', header: 'Task Type' },
      { field: 'dueDate', header: 'Due Date' },
    ];
    this.tasks = [];

    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(state => {
        this.accountNumber = state && state.accountNumber;

        // if account number is not present/invalid, return to search
        if (!this.accountNumber) {
          this.router.navigate(['./../search'], { relativeTo: this.route });
          return;
        }

        this.createTaskService.getAccountByAccountNumber(this.accountNumber).subscribe((accounts: Account[]) => {
          this.accountDetails = accounts[0];

          this.createTaskService.getTasksByAccountNumber(this.accountDetails.accountNumber)
            .subscribe((tasks: any) => {
              this.tasks = tasks.filter((task: any) => task.taskType === 'Contact Center');
            });
        });
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

}
