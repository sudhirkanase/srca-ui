import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMUNICATION_DROPDOWN_DATA } from './../../../app.constants';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'srca-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})

export class CommunicationComponent implements OnInit {
  display: boolean = false;
  types: SelectItem[];
  reason: SelectItem[];
  dropdownData: { [key: string]: string[] };
  issubmitted = false
  communicationForm: FormGroup;
  constructor() { }

  ngOnInit() {
    this.dropdownData = COMMUNICATION_DROPDOWN_DATA;
    this.initializeCommunicationForm()
    this.loadCommunicationType()
  }

//create and initialized communication form
  initializeCommunicationForm() {
    this.communicationForm = new FormGroup({
      commType: new FormControl(null, Validators.required),
      commReason: new FormControl(null, Validators.required),
      name: new FormControl(null),
      number: new FormControl(null),
      fdate: new FormControl(null),
      notes: new FormControl(null),
    })
  }

//load communication type dropdown values
  loadCommunicationType(): void {
    const commTypeOptions = Object.keys(this.dropdownData).map((key: string) => {
      return {
        label: key, value: key
      };
    });

    this.types = [{ label: 'Select Type', value: null }, ...commTypeOptions]
  }

//load reason dropdown values based on type selection
  loadReasonByType(commTypeOptions: string): void {
    if (!commTypeOptions) {
      this.reason = [];
      return;
    }
    this.communicationForm.get('commReason').setValue(null);
    const reasonOptions = this.dropdownData[commTypeOptions].map(reason => {
      return {
        label: reason, value: reason
      };
    });

    this.reason = [{ label: 'Select Reason', value: null }, ...reasonOptions];
  }

  //show dialog on new entry click
  showDialog() {
    this.display = true;
  }

  //submit method
  onSubmit() {
    this.issubmitted = true
    console.log(this.communicationForm.value)
    if (this.communicationForm.valid) {
      this.issubmitted = false;
      this.communicationForm.reset();
    }
  }

  //cancel method
  onCancel() {
    this.display = false;
  }

  //method to get form control
  get commType() : FormControl{
     return this.communicationForm.get('commType') as FormControl
  }

  get commReason() : FormControl{
    return this.communicationForm.get('commReason') as FormControl
 }
}

