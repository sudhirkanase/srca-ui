import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Task } from '../../model/Task';
import { TaskState } from 'src/app/app.constants';
import { TasksService } from '../../services/tasks.service';
import { SelectItem } from 'primeng/api';

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
  rushTypes: SelectItem[];
  isTaskInReview: boolean;
  isTaskInView: boolean;
  isSaveBtnClicked: boolean;
  message: { [key: string]: string };
  formControlLabelMapping: { [key: string]: string };
  individualOptions: SelectItem[];

  set taskState(value: TaskState) {
    this.taskStateValue = value;
    this.onTaskStateChange();
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

  constructor(private formBuilder: FormBuilder, private taskService: TasksService) {
    super();
  }
  /**
   * initialize the task details
   */

  ngOnInit() {
    this.taskDetailForm = this.formBuilder.group({});
    this.formControlLabelMapping = {
      changeDesc: 'Change Description',
      rush: 'Rush',
      additionalInfo: 'Additional Informatiom',
      userGroup: 'User Group',
      individual: 'Individual',
    };
    this.initializeTaskDetailsForm();
    this.rushType();
  }
  /**
   * Check the task state and update form accordingly.
   */
  onTaskStateChange(): void {
    this.isTaskInReview = (this.taskState === this.taskStateEnum.REVIEW);
    this.isTaskInView = (this.taskState === this.taskStateEnum.VIEW);
    if (this.isTaskInReview) {
      this.loadIndividualOptions();
      this.onIndividualSelection();
    }
  }

  initializeTaskDetailsForm(): void {
    this.taskDetailForm = this.formBuilder.group({
      changeDesc: [null, Validators.required],
      rush: ['low', Validators.required],
      additionalInfo: [null, Validators.required],
      userGroup: [null],
      individual: [null]
    });
  }

  /**
   * Populate rushtype dropdown data 
   */
  rushType(): void {
    this.rushTypes = [
      { label: 'low', value: 'low' },
      { label: 'high', value: 'high' },
    ];
  }

  /**
   * Populate individual dropdown data if assignTo is individual
   */
  loadIndividualOptions(): void {
    // TODO - fetch from API
    this.individualOptions = [
      { label: 'Select Individual', value: null },
      { label: 'Pascal, Chan', value: 'Pascal, Chan' },
      { label: 'Meyer, Steffie', value: 'Meyer, Steffie' },
      { label: 'Cranston, John', value: 'Cranston, John' },
    ];
  }

  onIndividualSelection(): void {
    // TODO - fetch from API
    this.userGroup.setValue('WM NC-Philanthropic CS (Inactive)');
  }

  /**
   * form control values
   */
  get changeDesc(): FormControl {
    return this.taskDetailForm.get('changeDesc') as FormControl;
  }
  get rush(): FormControl {
    return this.taskDetailForm.get('rush') as FormControl;
  }
  get additionalInfo(): FormControl {
    return this.taskDetailForm.get('additionalInfo') as FormControl;
  }
  get userGroup(): FormControl {
    return this.taskDetailForm.get('userGroup') as FormControl;
  }
  get individual(): FormControl {
    return this.taskDetailForm.get('individual') as FormControl;
  }

  /**
   * If the form is valid, submit the Account maintenance task details form.
   * Else, show error message to the user
   */
  onSubmit() {
    this.isSaveBtnClicked = true;
    if (this.taskDetailForm.status === 'VALID') {
      const saveData = {
        taskDetail: this.taskDetailForm.value
      };
      // API call to persist data
      this.saveTask(this.createRequestBody(saveData));
      // on API success
      this.message = {
        cssClass: 'alert alert-success',
        text: 'Form submitted successfully'
      };
    } else {
      // find error controls and show error message
      let errorControls = '';
      let errorControlsCount = 0;
      Object.entries(this.taskDetailForm.controls)
        .filter((control: [string, AbstractControl]) => !control[1].valid)
        .forEach((control: [string, AbstractControl], index: number, controls: [string, AbstractControl][]) => {
          errorControls += this.formControlLabelMapping[control[0]];
          errorControlsCount++;
          if (index < controls.length - 1) {
            errorControls += ', ';
          }
        });
      this.message = {
        cssClass: 'alert alert-danger',
        text: `${errorControls} ${errorControlsCount === 1 ? 'field is' : 'fields are'} mandatory.`
      };
      this.taskDetailForm.markAllAsTouched();
    }
  }

  /**
   * Helper method to create model data to be sent to server
   */
  createRequestBody(dataToSave: any): any {
    const requestBody: any = {};
    requestBody.changeDesc = dataToSave.taskDetail.changeDesc;
    requestBody.rush = dataToSave.taskDetail.rush;
    requestBody.additionalInfo = dataToSave.taskDetail.additionalInfo;
    requestBody.userGroup = dataToSave.taskDetail.userGroup;
    requestBody.individual = dataToSave.taskDetail.individual;
    return requestBody;
  }

  /**
   * Save the Account Maintenance details to the backend
   */
  saveTask(dataToSave: any): void {
    const requestBody = { ...this.taskDetailData, ...dataToSave };
    requestBody.taskType = 'Account Maintenance';
    const taskType = 'ACCOUNTMAINTENANCE';
    this.taskService.saveAccountMaintenanceTaskDetails(requestBody, taskType).subscribe(
      (saveTaskResponse) => {
        // if (saveTaskResponse) {
        //   this.location.back();
        // }
      }, (error: any) => {
        this.message = {
          cssClass: 'alert alert-danger',
          text: error.error.errorMessage
        };
      }
    );
  }

}
