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

  saveTask(taskDetail: any): void {
    const updatedTaskData =  {...this.contactCenterData, ...{taskDetail}};
    updatedTaskData.taskType = 'Contact Center';
    this.createTaskService.saveContactCenterTaskDetails(updatedTaskData).subscribe(saveTaskResponse => {
      if(saveTaskResponse && saveTaskResponse === 'success') {
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
