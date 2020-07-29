import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { CreateTaskService } from '../../services/create-task.service';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TaskState } from '../../../app.constants';

@Component({
  selector: 'srca-contact-center',
  templateUrl: './contact-center.component.html',
  styleUrls: ['./contact-center.component.scss']
})
export class ContactCenterComponent implements OnInit {

  contactDetailRequest: any;
  contactCenterData: any;
  taskStateEnum = TaskState;
  contactCenterTaskState: TaskState;
  requestBody: any;

  constructor(
    private createTaskService: CreateTaskService,
    private location: Location
  ) { }

  @ViewChild(TaskDetailComponent, { static: false }) srcaTaskDetails: TaskDetailComponent;

  ngOnInit() {

    this.contactCenterTaskState = this.taskStateEnum.ADD;

    this.contactDetailRequest = history.state.data;


    if (!isNullOrUndefined(this.contactDetailRequest)) {
      this.getTaskDetails();
    } else {
      this.location.back();
    }
  }

  getTaskDetails() {
    if (!isNullOrUndefined(this.contactDetailRequest)) {
      let contactCenterReq = {
        accountNo: this.contactDetailRequest.accountNo,
        id: this.contactDetailRequest.taskID,
        taskType: 'Contact Center'
      }
      this.createTaskService.
      getTaskDetails(contactCenterReq).subscribe(data => {
        this.contactCenterData = data;
      });
  }
  }

  createRequestBody(taskDetail): void {
    this.requestBody.callCode = taskDetail.callCode;
    this.requestBody.callDetails = taskDetail.callDetails;
    this.requestBody.callerName = taskDetail.callerName;
    this.requestBody.callerPhone = taskDetail.callerPhone;
    this.requestBody.action = taskDetail.action;
    this.requestBody.fullyAuthenticated = taskDetail.fullyAuthenticated;
    this.requestBody.taskNotes = taskDetail.taskNotes; 
    this.requestBody.taskPriority = taskDetail.taskPriority;
    this.requestBody.isTaxpayerId = taskDetail.taxPayerIDAvailable;
  }

  saveTask(taskDetail: any): void {
    this.requestBody = this.contactCenterData;
    this.requestBody.taskType = 'Contact Center';
    this.createRequestBody(taskDetail);
    this.createTaskService.saveContactCenterTaskDetails(this.requestBody).subscribe(saveTaskResponse => {
      if(saveTaskResponse) {
        this.location.back();
      }
    });
  }

  cancelClick(): void {
    this.location.back();
  }

  updateTaskState(): void {
    if (this.contactCenterTaskState === this.taskStateEnum.ADD) {
      this.contactCenterTaskState = this.taskStateEnum.REVIEW;
    } else {
      this.contactCenterTaskState = this.taskStateEnum.ADD;
    }
  }
}
