import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { CreateTaskService } from 'src/app/create-task/services/create-task.service';
import { TaskDetailsHostDirective } from '../directives/task-details-host.directive';
import { ContactCenterTaskComponent } from '../components/contact-center-task/contact-center-task.component';
import { Task } from '../components/Task';
import { TaskState } from './../../app.constants';

@Component({
  selector: 'srca-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit {

  taskRequestData: any;
  taskData: any;
  taskComponent: Task;

  taskStateEnum: typeof TaskState;

  @ViewChild(TaskDetailsHostDirective, { static: true }) taskDetailsHost: TaskDetailsHostDirective;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private componentFactoryResolver: ComponentFactoryResolver,
    private createTaskService: CreateTaskService
  ) { }

  ngOnInit() {
    this.taskStateEnum = TaskState;

    this.taskRequestData = window.history.state.data;

    this.taskData = {
      accountDetail: {}
    };

    if (!isNullOrUndefined(this.taskRequestData)) {
      this.getTaskDetails();
    } else {
      this.location.back();
    }

  }

  cancelClick(): void {
    this.location.back();
  }

  getTaskDetails(): void {
    if (!isNullOrUndefined(this.taskRequestData)) {
      const taskRequest: any = {
        accountNo: this.taskRequestData.accountNo,
        id: this.taskRequestData.taskID,
        taskType: this.taskRequestData.actionName
      };
      this.createTaskService.
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
    this.taskComponent.taskState = TaskState.ADD;
    this.taskComponent.saveTaskDetails.subscribe((data: any) => this.saveTask(data));
  }

  saveTask(dataToSave: any): void {
    const requestBody = { ...this.taskData, ...dataToSave };
    requestBody.taskType = this.taskRequestData.actionName;
    this.createTaskService.saveContactCenterTaskDetails(requestBody).subscribe(saveTaskResponse => {
      if (saveTaskResponse) {
        this.location.back();
      }
    });
  }

  updateTaskState(): void {
    if (this.taskComponent.taskState === this.taskStateEnum.ADD || this.taskComponent.taskState === this.taskStateEnum.EDIT) {
      this.taskComponent.taskState = this.taskStateEnum.REVIEW;
    } else {
      this.taskComponent.taskState = this.taskRequestData.actionType;
    }
  }

}
