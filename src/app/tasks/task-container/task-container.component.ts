import { TaskState } from './../../app.constants';
import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { isNullOrUndefined } from 'util';
import { CreateTaskService } from 'src/app/create-task/services/create-task.service';
import { TaskDetailsHostDirective } from '../directives/task-details-host.directive';
import { ContactCenterDetailsComponent } from '../components/contact-center-details/contact-center-details.component';
// import { TaskType } from 'src/app/app.constants';

@Component({
  selector: 'srca-task-container',
  templateUrl: './task-container.component.html',
  styleUrls: ['./task-container.component.scss']
})
export class TaskContainerComponent implements OnInit {

  taskRequestData: any;
  taskData: any;

  @ViewChild(TaskDetailsHostDirective, { static: true }) taskDetailsHost: TaskDetailsHostDirective;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private componentFactoryResolver: ComponentFactoryResolver,
    private createTaskService: CreateTaskService
  ) { }

  ngOnInit() {
    this.taskRequestData = window.history.state.data;

    this.taskData = {
      accountDetail: {}
    };

    if (!isNullOrUndefined(this.taskRequestData)) {
      this.getTaskDetails();
    } else {
      this.location.back();
    }

    // this.taskData = {
    //   id: 10001,
    //   status: 'NEW',
    //   phone: '(999) 999-9999',
    //   createdDate: '7/5/2020',
    //   email: 'test@email.com',
    //   assignedUserGroup: null,
    //   assignedEmail: 'admin-assigned@Wellsfargo.com',
    //   accountService: 'admin',
    //   accountDetail: {
    //     accountNumber: 112351,
    //     accountShortName: 'Account for 112351',
    //     mainAccountNumber: 3411230,
    //     marketValue: 371572,
    //     branchCode: 2257
    //   }
    // };

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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ContactCenterDetailsComponent);

    const viewContainerRef = this.taskDetailsHost.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as ContactCenterDetailsComponent).taskDetailData = this.taskData;
    (componentRef.instance as ContactCenterDetailsComponent).taskState = TaskState.ADD;
  }

}
