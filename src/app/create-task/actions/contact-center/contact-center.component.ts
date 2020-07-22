import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { CreateTaskService } from '../../services/create-task.service';

@Component({
  selector: 'tmt-contact-center',
  templateUrl: './contact-center.component.html',
  styleUrls: ['./contact-center.component.scss']
})
export class ContactCenterComponent implements OnInit {

  accountNumber: number;
  contactDetailRequest: any;
  contactCenterData: any;

  constructor(
    private createTaskService: CreateTaskService,
    private location: Location
  ) { }

  ngOnInit() {

    this.contactDetailRequest = history.state.data;
    if (!isNullOrUndefined(this.contactDetailRequest)) {
      if (this.contactDetailRequest.taskID === 0 &&
        this.contactDetailRequest.accountAction === 'Add') {
        this.getContactInfo();
      } else {
        this.getContactDetailsByTask();
      }
    } else {
      this.location.back();
    }

  }

  // Add Contact center details
  getContactInfo() {
    this.createTaskService
      .getContactDetailsByAccountNo(this.contactDetailRequest.accountNumber).subscribe(data => {
        this.contactCenterData = data;
      });
  }

  // Update Contact center details from home screen
  getContactDetailsByTask() {
    this.createTaskService
      .getContactDetailsByTask(this.contactDetailRequest.accountNumber).subscribe(data => {
        this.contactCenterData = data;
      });
  }
}
