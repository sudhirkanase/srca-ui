import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { TaskDetailsHostDirective } from '../directives/task-details-host.directive';
import { TaskComponentFactory } from '../factory/task-component.factory';
import { Task } from '../model/Task';
import { TasksService } from '../services/tasks.service';
import { TaskState } from './../../app.constants';
import { TabView } from 'primeng/tabview';

@Component({
  selector: 'srca-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit {

  taskInitData: any;
  taskData: any;
  taskComponent: Task;

  taskStateEnum: typeof TaskState;
  @ViewChild(TaskDetailsHostDirective, { static: true }) taskDetailsHost: TaskDetailsHostDirective;

  constructor(
    private location: Location,
    private taskComponentFactory: TaskComponentFactory,
    private taskService: TasksService
  ) { }

  ngOnInit() {
    this.taskStateEnum = TaskState;

    this.taskInitData = window.history.state.data;

    this.taskData = {
      accountDetail: {}
    };

    if (!isNullOrUndefined(this.taskInitData)) {
      this.getTaskDetails();
    } else {
      this.location.back();
    }

  }

  /**
   * Navigate back to previous page on cancel click
   */
  cancelClick(): void {
    this.location.back();
  }

  /**
   * Get the task details from the backend
   */
  getTaskDetails(): void {
    if (!isNullOrUndefined(this.taskInitData)) {
      const taskRequest: any = {
        accountNo: this.taskInitData.accountNo,
        id: this.taskInitData.taskID,
        taskType: this.taskInitData.actionName
      };
      this.taskService.
        getTaskDetails(taskRequest).subscribe(data => {
          this.taskData = data;
          this.loadComponent();
        });
    }
  }

  /**
   * Calls the task component factory to dynamically load the task component in the DOM
   */
  loadComponent(): void {
    this.taskComponent = this.taskComponentFactory
      .getComponent(this.taskDetailsHost.viewContainerRef, this.taskInitData.actionName);
    this.taskComponent.taskDetailData = this.taskData;
    this.taskComponent.taskState = this.taskInitData.actionType;
  }

  /**
   * Responsible for moving the task from initial state to REVIEW state and vice versa
   */
  updateTaskState(): void {
    if (this.taskComponent.taskState === this.taskStateEnum.ADD || this.taskComponent.taskState === this.taskStateEnum.EDIT) {
      this.taskComponent.taskState = this.taskStateEnum.REVIEW;
    } else {
      this.taskComponent.taskState = this.taskInitData.actionType;
    }
  }

  onTabChange(event) {
    if (event.index === 2) {
      this.getAuditData();
    }
  }

  getAuditData() {
    if (!isNullOrUndefined(this.taskData.id)) {
      this.taskService.getAuditData(this.taskData.id).subscribe(data => {
        this.taskData.audit = data;
      });
    }
  }

}
