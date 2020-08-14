import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Task } from '../../model/Task';
import { TaskState } from 'src/app/app.constants';
import { TasksService } from '../../services/tasks.service';
import { SelectItem } from 'primeng/api';
import { isNullOrUndefined } from 'util';

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
  userGroupOptions: SelectItem[];
  isTaskInReview: boolean;
  isTaskInView: boolean;
  isSaveBtnClicked: boolean;
  message: { [key: string]: string };
  formControlLabelMapping: { [key: string]: string };
  individualOptions: SelectItem[];
  accountColumns: any[];
  additionalAccounts = [];
  display: any;
  validationErr: string;
  contactCenterSearch = false;

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

  constructor(private formBuilder: FormBuilder, private taskService: TasksService, private location: Location) {
    super();
  }
  /**
   * initialize the task details
   */

  ngOnInit() {
    console.log(this.taskDetailDataValue.accountDetail.branchName);
    this.taskDetailForm = this.formBuilder.group({});
    this.formControlLabelMapping = {
      changeDescription: 'Change Description',
      taskPriority: 'Rush',
      additionalInformation: 'Additional Informatiom',
      assignedUserGroup: 'User Group',
      selectedIndividual: 'Individual',
    };

    this.accountColumns = [
      { field: 'accountNumber', header: 'Account Number' },
      { field: 'accountShortName', header: 'Account Short Name' },
    ];
    this.initializeTaskDetailsForm();
    this.rushType();

    this.updateForm();
  }
  /**
   * Check the task state and update form accordingly.
   */
  onTaskStateChange(): void {
    this.isTaskInReview = (this.taskState === this.taskStateEnum.REVIEW);
    this.isTaskInView = (this.taskState === this.taskStateEnum.VIEW);
    if (this.isTaskInReview) {
      this.loadIndividualOptions();
      this.loadUserGroupOptions();
    }
  }

  /**
   * To Set Data in edit/preview action
   */
  updateForm(): void {
    if (!isNullOrUndefined(this.taskDetailDataValue)) {
      this.taskDetailForm.patchValue({
        changeDescription: this.taskDetailDataValue.changeDescription,
        taskPriority: this.taskDetailDataValue.taskPriority,
        additionalInformation: this.taskDetailDataValue.additionalInformation,
        assignedUserGroup: this.taskDetailDataValue.assignedUserGroup,
        selectedIndividual: this.taskDetailDataValue.selectedIndividual
      });
      this.additionalAccounts = this.taskDetailData.additionalAccounts;
      // To load the dropdown options
      this.loadIndividualOptions();
      this.loadUserGroupOptions();
    }
  }

  initializeTaskDetailsForm(): void {
    this.taskDetailForm = this.formBuilder.group({
      changeDescription: [null, Validators.required],
      taskPriority: ['low'],
      additionalInformation: [null, Validators.required],
      assignedUserGroup: [null],
      selectedIndividual: [null]
    });
  }

  /**
   * Populate rush type dropdown data
   */
  rushType(): void {
    this.rushTypes = [
      { label: 'Low', value: 'low' },
      { label: 'High', value: 'high' },
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

  loadUserGroupOptions(): void {
    // TODO - fetch from API
    this.userGroupOptions = [
      { label: 'Select Individual', value: null },
      { label: 'WM NC-Philanthropic CS (Inactive)', value: 'WM NC-Philanthropic CS (Inactive)' },
    ];
  }

  /**
   * form control values
   */
  get changeDescription(): FormControl {
    return this.taskDetailForm.get('changeDescription') as FormControl;
  }
  get taskPriority(): FormControl {
    return this.taskDetailForm.get('taskPriority') as FormControl;
  }
  get additionalInformation(): FormControl {
    return this.taskDetailForm.get('additionalInformation') as FormControl;
  }
  get assignedUserGroup(): FormControl {
    return this.taskDetailForm.get('assignedUserGroup') as FormControl;
  }
  get selectedIndividual(): FormControl {
    return this.taskDetailForm.get('selectedIndividual') as FormControl;
  }

  /**
   * If the form is valid, submit the Account maintenance task details form.
   * Else, show error message to the user
   */
  onSubmit() {
    this.isSaveBtnClicked = true;
    if (this.taskDetailForm.status === 'VALID') {
      if (this.taskDetailForm.get('taskPriority').value === null) {
        this.taskDetailForm.get('taskPriority').setValue('Low');
      }
      // API call to persist data
      this.saveTask(this.taskDetailForm.value);
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
   * Save the Account Maintenance details to the backend
   */
  saveTask(dataToSave: any): void {
    const requestBody = { ...this.taskDetailData, ...dataToSave };
    requestBody.additionalAccounts = this.additionalAccounts;
    requestBody.taskType = 'Account Maintenance';
    const taskType = 'ACCOUNTMAINTENANCE';
    this.taskService.saveAccountMaintenanceTaskDetails(requestBody, taskType).subscribe(
      (saveTaskResponse) => {
        if (saveTaskResponse) {
          this.location.back();
        }
      }, (error: any) => {
        this.message = {
          cssClass: 'alert alert-danger',
          text: error.error.errorMessage
        };
      }
    );
  }

  /**
   * To Add the Selected account in Additional Accounts
   */
  addSelectedAccount(selectedAccount): void {
    if (this.taskDetailData.accountDetail.accountNumber === selectedAccount.accountNumber) {
      this.validationErr = 'Additional Account cannot be same as Selected Account';
      this.display = false;
      setTimeout(() => {
       this.validationErr = '';
      }, 1000);
      return;
    }
    if (!isNullOrUndefined(this.additionalAccounts)) {
      const index: number = this.additionalAccounts.findIndex(account => account.accountNumber === selectedAccount.accountNumber);
      if (index === -1) {
        this.additionalAccounts.push(selectedAccount);
      } else {
        this.validationErr = 'Selected Account is already present.';
        this.display = false;
        setTimeout(() => {
          this.validationErr = '';
         }, 1000);
        return;
      }
    } else {
      this.additionalAccounts = [];
      this.additionalAccounts.push(selectedAccount);
    }
    this.display = false;
    this.validationErr = '';
  }

  /**
   * To Delete the Additional Account added
   * @param rowData
   */
  deleteAccount(rowData): void {
    if (!isNullOrUndefined(this.additionalAccounts)) {
      const index: number = this.additionalAccounts.indexOf(rowData);
      if (index !== -1) {
        this.additionalAccounts.splice(index, 1);
      }
    }
  }


}
