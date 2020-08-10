import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Task } from '../../model/Task';
import { TaskState } from 'src/app/app.constants';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'srca-account-maintenance-task',
  templateUrl: './account-maintenance-task.component.html',
  styleUrls: ['./account-maintenance-task.component.scss']
})
export class AccountMaintenanceTaskComponent extends Task implements OnInit {
  taskStateEnum = TaskState;
  private taskStateValue: TaskState;
  private taskDetailDataValue: any;
  taskDetailForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private tasksService: TasksService) {
    super();
  }

  set taskState(value: TaskState) {
    this.taskStateValue = value;
  }

  get taskState(): TaskState {
    return this.taskStateValue;
  }

  set taskDetailData(value: any) {
    this.taskDetailDataValue = value;
  }

  get taskDetailData(): any {
    return this.taskDetailDataValue;
  }

  ngOnInit() {
    this.taskDetailForm = this.formBuilder.group({});
  }

  saveTask(data: any): void {
    // TODO
  }

}
