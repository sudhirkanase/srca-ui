import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { Subscription } from 'rxjs';
import { ASSIGN_TO_DROPDOWN_DATA, CONTACT_CENTER_TASK_DROPDOWN_DATA, TaskState } from 'src/app/app.constants';
import { isNullOrUndefined } from 'util';
import { Task } from '../../model/Task';
import { TasksService } from '../../services/tasks.service';


@Component({
  selector: 'srca-contact-center-task',
  templateUrl: './contact-center-task.component.html',
  styleUrls: ['./contact-center-task.component.scss']
})
export class ContactCenterTaskComponent extends Task implements OnInit, OnDestroy {

  taskPriorityData: SelectItem[];
  callCodes: SelectItem[];
  actions: SelectItem[];
  assignToOptions: SelectItem[];
  individualOptions: SelectItem[];

  taskDetailForm: FormGroup;

  accountColumns: any[];
  accounts: Account[];

  dropdownData: { [key: string]: string[] };
  assignToData: string[];

  isSaveBtnClicked: boolean;
  message: { [key: string]: string };
  formControlLabelMapping: { [key: string]: string };

  isTaskInReview: boolean;
  isTaskInView: boolean;

  taskStateEnum = TaskState;
  private taskStateValue: TaskState;
  private taskDetailDataValue: any;

  taskCompleteSubscription: Subscription;

  officerListColumns: any[];
  officerListData: any[];
  selectedOfficerList = [];

  set taskState(value: TaskState) {
    this.taskStateValue = value;
    this.onTaskStateChange();
  }

  get taskState(): TaskState {
    return this.taskStateValue;
  }

  set taskDetailData(value: any) {
    this.taskDetailDataValue = value;
    this.onTaskDetailDataChange();
  }

  get taskDetailData(): any {
    return this.taskDetailDataValue;
  }

  constructor(
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private location: Location,
    private taskService: TasksService) {
    super();
  }

  /**
   * Check the task state and update form accordingly.
   */
  onTaskStateChange(): void {
    this.isTaskInReview = (this.taskState === this.taskStateEnum.REVIEW);
    this.isTaskInView = (this.taskState === this.taskStateEnum.VIEW);

    if (this.isTaskInReview) {
      const taskNotCompleteFields = ['assignTo', 'individual', 'userGroup'];

      this.updateControlValidators('taskComplete');

      // check if task complete subscription exist
      if (this.taskCompleteSubscription) {
        this.taskCompleteSubscription.unsubscribe();
        this.taskCompleteSubscription = null;
      }

      this.taskCompleteSubscription = this.taskComplete.valueChanges.subscribe((value: string) => {
        if (value === 'no') {
          this.message = null;
          this.loadAssignToOptions();
          this.loadIndividualOptions();
          taskNotCompleteFields.forEach(controlName => this.updateControlValidators(controlName));

        } else {
          // Reset to null when yes selected in Task Completed
          this.taskDetailForm.get('assignTo').setValue(null);
          this.taskDetailForm.get('individual').setValue(null);
          taskNotCompleteFields.forEach(controlName => {
            this.updateControlValidators(controlName, true);
          });
        }
      });
    } else {
      if (this.taskDetailForm) {
        this.updateControlValidators('taskComplete', true);
      }
    }
  }

  /**
   * Populate the form with values received. Used in Edit/View scenarios
   */
  onTaskDetailDataChange() {
    setTimeout(() => this.updateValues());
  }

  /**
   * Helper method to set or clear form control validators
   * @param controlName - name of the control
   * @param remove - should the control validations be set or clear
   */
  updateControlValidators(controlName: string, remove: boolean = false): void {
    const control: FormControl = this.taskDetailForm.get(controlName) as FormControl;
    if (remove) {
      control.clearValidators();
    } else {
      control.setValidators(Validators.required);
    }
    control.updateValueAndValidity();
    control.markAsUntouched();
  }

  /**
   * initialize the task details
   */
  ngOnInit() {
    this.dropdownData = CONTACT_CENTER_TASK_DROPDOWN_DATA;
    this.assignToData = ASSIGN_TO_DROPDOWN_DATA;

    this.formControlLabelMapping = {
      callerName: 'Caller name',
      callerPhone: 'Caller phone',
      action: 'Action',
      callCode: 'Call code',
      taxPayerIDAvailable: 'TaxPayer ID Selection',
      taxPayerID: 'TaxPayer ID',
      fullyAuthenticated: 'Fully authenticated',
      callDetails: 'Call details',
      taskComplete: 'Task complete',
      assignTo: 'Assign to',
      individual: 'Individual'
    };

    this.taskPriorityData = [
      { label: 'Low', value: 'low' },
      { label: 'High', value: 'high' }
    ];

    this.accountColumns = [
      { field: 'accountNumber', header: 'Account Number' },
      { field: 'accountName', header: 'Account Short Name' },
    ];
    this.accounts = [];


    this.officerListColumns = [
      { field: 'Select', header: 'Select' },
      { field: 'officer', header: 'Officer' },
      { field: 'adminCode', header: 'AdminCode' },
      { field: 'name', header: 'Name' },
      { field: 'email', header: 'Email' },
    ];

    this.officerListData = [
      { officer: 'Administrator', adminCode: 6006, name: 'Josh Stephen', email: 'josh.stephen@gmail.com' },
      { officer: 'Backup Administrator', adminCode: 1001, name: 'Mary Steph', email: 'mary.steph@gmail.com' },
      { officer: 'Sr. Administrator', adminCode: 2002, name: 'John Wilsons', email: 'john.wilsons@gmail.com' },
      { officer: 'Investment Manager', adminCode: 2300, name: 'Jorge Effison', email: 'jorge.effison@gmail.com' },
      { officer: 'Backup Investment Mgr', adminCode: 4589, name: 'Josh Effison', email: 'josh.effison@gmail.com' }
    ];
    this.initializeTaskDetailsForm();
    this.loadCallCodes();
    this.subscribeForTaxPayerIDAvailability();
  }

  initializeTaskDetailsForm(): void {
    this.taskDetailForm = this.formBuilder.group({
      callerName: [null, Validators.required],
      callerPhone: [null, Validators.required],
      action: [null, Validators.required],
      callCode: [null, Validators.required],
      taxPayerIDAvailable: [null, Validators.required],
      fullyAuthenticated: [null, Validators.required],
      taskPriority: ['low'],
      taskNotes: [null],
      callDetails: [null, Validators.required],
      taskComplete: [null],
      assignTo: [null],
      individual: [null],
      userGroup: [null]
    });
  }

  /**
   * Show Tax Payer ID input if client has indicated availability.
   */
  subscribeForTaxPayerIDAvailability(): void {
    this.taxPayerIDAvailable.valueChanges
      .subscribe((value: string) => {
        if (value === 'yes') {
          this.taskDetailForm.addControl('taxPayerID', new FormControl(null, Validators.required));
          if (!isNullOrUndefined(this.taskDetailData) && this.taskDetailData.taxpayerId) {
            this.taskDetailForm.patchValue({
              taxPayerID: this.taskDetailData.taxpayerId
            });
          }
        } else {
          this.taskDetailForm.removeControl('taxPayerID');
        }
      });
  }

  /**
   * Populate call code dropdown values
   */
  loadCallCodes(): void {
    const callCodeOptions = Object.keys(this.dropdownData).map((key: string) => {
      return {
        label: key, value: key
      };
    });

    this.callCodes = [{ label: 'Select Call Code', value: null }, ...callCodeOptions];
  }

  /**
   * Update the action dropdown depending on selected call code value
   * @param callCodeValue value of call code dropdown
   */
  loadActionByCallCode(callCodeValue: string): void {
    if (!callCodeValue) {
      this.actions = [];
      return;
    }

    this.action.setValue(null);
    const actionOptions = this.dropdownData[callCodeValue].map(action => {
      return {
        label: action, value: action
      };
    });

    this.actions = [{ label: 'Select Action', value: null }, ...actionOptions];
  }

  /**
   * If task is incomplete, populate assign to dropdown for task assignment
   */
  loadAssignToOptions(): void {
    const assignToValues = this.assignToData.map((key: string) => {
      return {
        label: key, value: key
      };
    });

    this.assignToOptions = [{ label: 'Select Assign To', value: null }, ...assignToValues];
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

  /**
   * Update user group based on the value selected in the individual field
   */
  onIndividualSelection(): void {
    // TODO - fetch from API
    this.userGroup.setValue('WM NC-Philanthropic CS (Inactive)');
  }

  get callerName(): FormControl {
    return this.taskDetailForm.get('callerName') as FormControl;
  }

  get callerPhone(): FormControl {
    return this.taskDetailForm.get('callerPhone') as FormControl;
  }

  get callCode(): FormControl {
    return this.taskDetailForm.get('callCode') as FormControl;
  }

  get action(): FormControl {
    return this.taskDetailForm.get('action') as FormControl;
  }

  get taxPayerID(): FormControl {
    return this.taskDetailForm.get('taxPayerID') as FormControl;
  }

  get taxPayerIDAvailable(): FormControl {
    return this.taskDetailForm.get('taxPayerIDAvailable') as FormControl;
  }

  get fullyAuthenticated(): FormControl {
    return this.taskDetailForm.get('fullyAuthenticated') as FormControl;
  }

  get taskPriority(): FormControl {
    return this.taskDetailForm.get('taskPriority') as FormControl;
  }

  get callDetails(): FormControl {
    return this.taskDetailForm.get('callDetails') as FormControl;
  }

  get taskNotes(): FormControl {
    return this.taskDetailForm.get('taskNotes') as FormControl;
  }

  get taskComplete(): FormControl {
    return this.taskDetailForm.get('taskComplete') as FormControl;
  }

  get assignTo(): FormControl {
    return this.taskDetailForm.get('assignTo') as FormControl;
  }

  get individual(): FormControl {
    return this.taskDetailForm.get('individual') as FormControl;
  }

  get userGroup(): FormControl {
    return this.taskDetailForm.get('userGroup') as FormControl;
  }

  /**
   * In case of task edit scenario, update the form with existing task information
   */
  updateValues() {

    this.loadAssignToOptions();
    this.loadIndividualOptions();

    if (!isNullOrUndefined(this.taskDetailData)) {
      this.taskDetailForm.patchValue({
        callerName: this.taskDetailData.callerName,
        callerPhone: this.taskDetailData.callerPhone,
        action: this.taskDetailData.action,
        callCode: this.taskDetailData.callCode,
        taxPayerIDAvailable: this.taskDetailData.isTaxpayerId,
        fullyAuthenticated: this.taskDetailData.fullyAuthenticated,
        taskPriority: this.taskDetailData.taskPriority,
        callDetails: this.taskDetailData.callDetails,
        taskNotes: this.taskDetailData.taskNotes,
        taskComplete: this.taskDetailData.taskCompleted,
        individual: this.taskDetailData.selectedIndividual,
        assignTo: this.taskDetailData.assignTo,
        userGroup: this.taskDetailData.assignedUserGroup
      });

      if (this.taskDetailData.isTaxpayerId === 'yes') {
        if (this.taskDetailForm.get('taxPayerID')) {
          this.taskDetailForm.get('taxPayerID').setValue(this.taskDetailData.taxpayerId);
        }
      }
      this.loadActionByCallCode(this.taskDetailData.callCode);
      if (this.taskDetailData.action) {
        this.taskDetailForm.patchValue({
          action: this.taskDetailData.action
        });
      }

      this.selectedOfficerList = this.taskDetailData.officers;
    }
    this.cd.detectChanges();
  }

  /**
   * If the form is valid, submit the contact center task details form.
   * Else, show error message to the user
   */
  onSubmit() {
    this.isSaveBtnClicked = true;

    // To set User group only when task completed is no
    if (this.taskDetailForm.get('taskComplete').value === 'yes') {
      this.taskDetailForm.get('userGroup').setValue(null);
    } else {
      this.taskDetailForm.get('userGroup').setValue('WM NC-Philanthropic CS (Inactive)');
    }
    if (this.taskDetailForm.get('taskPriority').value === null) {
      this.taskDetailForm.get('taskPriority').setValue('Low');
    }
    if (this.taskDetailForm.status === 'VALID') {
      const saveData = {
        taskDetail: this.taskDetailForm.value,
        officersList: this.selectedOfficerList
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

  officerSelected(event, rowData) {
    if (!isNullOrUndefined(event.target.ariaChecked)) {
      const index: number = this.selectedOfficerList.indexOf(rowData);
      if (index === -1) {
        this.selectedOfficerList.push(rowData);
      }
    } else {
      if (!isNullOrUndefined(this.selectedOfficerList) || this.selectedOfficerList !== []) {
        const index: number = this.selectedOfficerList.indexOf(rowData);
        if (index !== -1) {
          this.selectedOfficerList.splice(index, 1);
        }
      }
    }
  }

  /**
   * Helper method to create model data to be sent to server
   */
  createRequestBody(dataToSave: any): any {
    const requestBody: any = {};

    requestBody.callCode = dataToSave.taskDetail.callCode;
    requestBody.callDetails = dataToSave.taskDetail.callDetails;
    requestBody.callerName = dataToSave.taskDetail.callerName;
    requestBody.callerPhone = dataToSave.taskDetail.callerPhone;
    requestBody.action = dataToSave.taskDetail.action;
    requestBody.fullyAuthenticated = dataToSave.taskDetail.fullyAuthenticated;
    requestBody.taskNotes = dataToSave.taskDetail.taskNotes;
    requestBody.taskPriority = dataToSave.taskDetail.taskPriority;
    requestBody.isTaxpayerId = dataToSave.taskDetail.taxPayerIDAvailable;
    requestBody.taxpayerId = dataToSave.taskDetail.taxPayerID;
    requestBody.assignedUserGroup = dataToSave.taskDetail.userGroup;
    requestBody.taskCompleted = dataToSave.taskDetail.taskComplete;
    requestBody.selectedIndividual = dataToSave.taskDetail.individual;
    requestBody.assignTo = dataToSave.taskDetail.assignTo;
    requestBody.officers = dataToSave.officersList;

    return requestBody;
  }

  /**
   * Save the contact center details to the backend
   */
  saveTask(dataToSave: any): void {
    const requestBody = { ...this.taskDetailData, ...dataToSave };
    requestBody.taskType = 'Contact Center';
    this.taskService.saveContactCenterTaskDetails(requestBody).subscribe(
      (saveTaskResponse) => {
        if (saveTaskResponse) {
          this.location.back();
        }
      }, (error: any) => {
        this.message = {
          cssClass: 'alert alert-danger',
          text: `Error saving contact center details.`
        };
      }
    );
  }

  /**
   * Component cleanup
   */
  ngOnDestroy() {
    if (this.taskCompleteSubscription) {
      this.taskCompleteSubscription.unsubscribe();
      this.taskCompleteSubscription = null;
    }
  }
}
