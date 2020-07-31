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

  @ViewChild(TaskDetailComponent, { static: false }) srcaTaskDetailsVC: TaskDetailComponent;

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
      const contactCenterReq: any = {
        accountNo: this.contactDetailRequest.accountNo,
        id: this.contactDetailRequest.taskID,
        taskType: 'Contact Center'
      };
      this.createTaskService.
        getTaskDetails(contactCenterReq).subscribe(data => {
          this.contactCenterData = data;
        });
    }
  }

  createRequestBody(dataToSave): void {
    this.requestBody.callCode = dataToSave.taskDetail.callCode;
    this.requestBody.callDetails = dataToSave.taskDetail.callDetails;
    this.requestBody.callerName = dataToSave.taskDetail.callerName;
    this.requestBody.callerPhone = dataToSave.taskDetail.callerPhone;
    this.requestBody.action = dataToSave.taskDetail.action;
    this.requestBody.fullyAuthenticated = dataToSave.taskDetail.fullyAuthenticated;
    this.requestBody.taskNotes = dataToSave.taskDetail.taskNotes;
    this.requestBody.taskPriority = dataToSave.taskDetail.taskPriority;
    this.requestBody.isTaxpayerId = dataToSave.taskDetail.taxPayerIDAvailable;
    this.requestBody.taxpayerId = dataToSave.taskDetail.taxPayerID;
    this.requestBody.assignedUserGroup = dataToSave.taskDetail.userGroup;
    this.requestBody.taskCompleted = dataToSave.taskDetail.taskComplete;
    this.requestBody.selectedIndividual = dataToSave.taskDetail.individual;
    this.requestBody.assignTo = dataToSave.taskDetail.assignTo;
    this.requestBody.officers = dataToSave.officersList
  }

  saveTask(dataToSave: any): void {
    this.requestBody = this.contactCenterData;
    this.requestBody.taskType = 'Contact Center';
    this.createRequestBody(dataToSave);
    console.log("Check Request now", this.requestBody);
    this.createTaskService.saveContactCenterTaskDetails(this.requestBody).subscribe(saveTaskResponse => {
      if (saveTaskResponse) {
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
