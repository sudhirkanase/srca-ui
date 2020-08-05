import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { TaskDetailsHostDirective } from '../directives/task-details-host.directive';
import { ContactCenterTaskComponent } from '../components/contact-center-task/contact-center-task.component';
import { Task } from '../model/Task';
import { TaskState } from './../../app.constants';
import { TasksService } from '../services/tasks.service';

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
    private componentFactoryResolver: ComponentFactoryResolver,
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

  loadComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContactCenterTaskComponent);

    const viewContainerRef = this.taskDetailsHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.taskComponent = (componentRef.instance as ContactCenterTaskComponent);
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

}
