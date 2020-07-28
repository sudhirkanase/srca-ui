import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SelectItem } from 'primeng/api/selectitem';
import { isNullOrUndefined } from 'util';
import { Account } from './../../../model/Account';
import { CONTACT_CENTER_TASK_DROPDOWN_DATA } from 'src/app/app.constants';

@Component({
  selector: 'srca-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnChanges {

  taskPriorityData: SelectItem[];
  callCodes: SelectItem[];
  actions: SelectItem[];
  taskDetailForm: FormGroup;
  accountColumns: any[];
  accounts: Account[];
  dropdownData: { [key: string]: string[] };
  isSaveBtnClicked: boolean;
  message: { [key: string]: string };
  formControlLabelMapping: { [key: string]: string };

  @Input() taskDetailData: any;
  @Output() saveTaskDetails = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private cd: ChangeDetectorRef, private location: Location) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.taskDetailData.previousValue !== changes.taskDetailData.currentValue) {
      setTimeout(() => {
        this.updateValues();
      });
    }
  }

  ngOnInit() {
    this.dropdownData = CONTACT_CENTER_TASK_DROPDOWN_DATA;

    this.taskDetailForm = this.formBuilder.group({
      callerName: [null, Validators.required],
      callerPhone: [null, Validators.required],
      action: [null, Validators.required],
      callCode: [null, Validators.required],
      taxPayerIDAvailable: [null, Validators.required],
      fullyAuthenticated: [null, Validators.required],
      taskPriority: ['low'],
      taskNotes: [null],
      callDetails: [null, Validators.required]
    });

    this.formControlLabelMapping = {
      callerName: 'Caller name',
      callerPhone: 'Caller phone',
      action: 'Action',
      callCode: 'Call code',
      taxPayerIDAvailable: 'TaxPayer ID Selection',
      taxPayerID: 'TaxPayer ID',
      fullyAuthenticated: 'Fully authenticated',
      callDetails: 'Call details'
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

    this.loadCallCodes();

    // check for taxPayerIDAvailable value changes
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

  loadCallCodes(): void {
    const callCodeOptions = Object.keys(this.dropdownData).map((key: string) => {
      return {
        label: key, value: key
      };
    });

    this.callCodes = [{ label: 'Select Call Code', value: null }, ...callCodeOptions];
  }

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

  updateValues() {
    if (!isNullOrUndefined(this.taskDetailData)) {
      this.taskDetailForm.setValue({
        callerName: this.taskDetailData.callerName,
        callerPhone: this.taskDetailData.callerPhone,
        action: this.taskDetailData.action,
        callCode: this.taskDetailData.callCode,
        taxPayerIDAvailable: this.taskDetailData.isTaxpayerId,
        fullyAuthenticated: this.taskDetailData.fullyAuthenticated,
        taskPriority: this.taskDetailData.taskPriority,
        callDetails: this.taskDetailData.callDetails,
        taskNotes: this.taskDetailData.taskNotes
      });
      this.loadActionByCallCode(this.taskDetailData.callCode);
      if (this.taskDetailData.action) {
        this.taskDetailForm.patchValue({
          action: this.taskDetailData.action
        });
      }
    }
    this.cd.detectChanges();
  }

  onSubmit() {
    this.isSaveBtnClicked = true;
    if (this.taskDetailForm.valid) {
      // API call to persist data
      this.saveTaskDetails.emit(this.taskDetailForm.value);
      // update taxPayerIDAvailable before form reset to hide the taxPayerID field
      this.taxPayerIDAvailable.setValue(null);
      this.taskDetailForm.reset();
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
}
