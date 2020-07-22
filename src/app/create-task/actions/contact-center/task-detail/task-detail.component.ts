import { Component, OnInit, Input, OnChanges, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';

@Component({
  selector: 'tmt-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit, OnChanges {

  taskPriority: SelectItem[];
  taskDetailForm: FormGroup;

  @Input() taskDetailData: any;

  constructor(private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private location: Location) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.taskDetailData.previousValue !== changes.taskDetailData.currentValue) {
      setTimeout(() => {
        this.updateValues();
      });
    }
  }

  ngOnInit() {

    this.taskDetailForm = this.formBuilder.group({
      callerName: [''],
      callerPhone: [''],
      action: [''],
      callCode: [''],
      taxPayerID: ['', Validators.required],
      fullyAuthenticated: ['', Validators.required],
      taskPriority: [''],
      callDetails: ['', Validators.required]
    });

    this.taskPriority = [
      { label: 'Low', value: 'low' },
      { label: 'High', value: 'high' }
    ];

  }

  updateValues() {
    if (!isNullOrUndefined(this.taskDetailData)) {
      this.taskDetailForm.setValue({
        callerName: this.taskDetailData.callerName,
        callerPhone: this.taskDetailData.callerPhone,
        action: this.taskDetailData.action,
        callCode: this.taskDetailData.callCode,
        taxPayerID: this.taskDetailData.taxPayerID,
        fullyAuthenticated: this.taskDetailData.fullyAuthenticated,
        taskPriority: this.taskDetailData.taskPriority,
        callDetails: this.taskDetailData.callDetails
      });

    }
    this.cd.detectChanges();
  }

  onSubmit() {
    console.log("Form control value", this.taskDetailForm.value);
  }

  CancelClick() {
    this.location.back();
  }

}
