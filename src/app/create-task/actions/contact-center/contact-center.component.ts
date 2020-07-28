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

  constructor(
    private createTaskService: CreateTaskService,
    private location: Location
  ) { }

  @ViewChild(TaskDetailComponent, { static: false }) srcaTaskDetails: TaskDetailComponent;

  ngOnInit() {

    this.contactCenterTaskState = this.taskStateEnum.ADD;

    this.contactDetailRequest = history.state.data;
    if (!isNullOrUndefined(this.contactDetailRequest)) {
      this.getContactDetail();
    } else {
      this.location.back();
    }
  }

  // API call to get contact center details
  getContactDetail() {
    const contactRequestBody = {
      id: this.contactDetailRequest.taskID,
      accountNo: this.contactDetailRequest.accountNo
    };
    this.createTaskService
      .getContactDetail(contactRequestBody).subscribe(data => {
        this.contactCenterData = data;
      });
  }

  saveTask(taskDetail: any): void {
    const updatedTaskData = { ...this.contactCenterData, ...{ taskDetail } };
    this.createTaskService.saveContactCenterTaskDetails(updatedTaskData.taskID, updatedTaskData);
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
