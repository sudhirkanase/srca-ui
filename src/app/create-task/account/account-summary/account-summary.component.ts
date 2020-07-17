import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CreateTaskService } from './../../services/create-task.service';
import { Account } from './../../model/Account';

@Component({
  selector: 'tmt-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss']
})
export class AccountSummaryComponent implements OnInit {

  accountDetails: Account;

  constructor(
    private createTaskService: CreateTaskService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    let accountNumber = parseInt(this.route.snapshot.paramMap.get('accountNumber'));

    this.createTaskService.getAccountByAccountNumber(accountNumber)
      .subscribe((account: Account[]) => {
        this.accountDetails = account[0];
      });
  }

  /**
   * Click handler for collapsible actions menu
   */
  actionClick(actionItem: HTMLElement): void {
    let dropdownContainerElement: HTMLDivElement = (actionItem.nextElementSibling as HTMLDivElement);
    let actionIcon = actionItem.querySelector('i');

    if (dropdownContainerElement.className.includes('active')) {
      dropdownContainerElement.className = 'dropdown-container';
      actionIcon.className = 'pi pi-caret-down';
    } else {
      dropdownContainerElement.className += ' active';
      actionIcon.className = 'pi pi-caret-up';
    }
  }

}
