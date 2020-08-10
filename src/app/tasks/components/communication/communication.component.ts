import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMUNICATION_DROPDOWN_DATA } from './../../../app.constants';
import { Component, OnInit, Input } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { TasksService } from '../../services/tasks.service';
import { Communication } from '../../model/communication';
import { isNullOrUndefined } from 'util';
import { AppSharedService } from 'src/app/services/app-shared.service';
import { ToastType } from 'src/app/shared/model/toast-type';

@Component({
  selector: 'srca-communication',
  templateUrl: './communication.component.html',
  styleUrls: ['./communication.component.scss']
})

export class CommunicationComponent implements OnInit {
  display = false;
  types: SelectItem[];
  reason: SelectItem[];
  dropdownData: { [key: string]: string[] };
  issubmitted = false;
  communicationForm: FormGroup;
  @Input() communicationData: any;

  constructor(
    private tasksService: TasksService,
    private appSharedService: AppSharedService) { }

  ngOnInit() {
    this.dropdownData = COMMUNICATION_DROPDOWN_DATA;
    this.initializeCommunicationForm();
    this.loadCommunicationType();
  }

  /**
   * @description create and initialized communication form
   */
  initializeCommunicationForm(): void {
    this.communicationForm = new FormGroup({
      communicationType: new FormControl(null, Validators.required),
      communicationReason: new FormControl(null, Validators.required),
      name: new FormControl(null),
      number: new FormControl(null),
      followUpDate: new FormControl(null),
      notes: new FormControl(null),
    });
  }

  /**
   * @description load communication type dropdown values
   */
  loadCommunicationType(): void {
    const commTypeOptions = Object.keys(this.dropdownData).map((key: string) => {
      return {
        label: key, value: key
      };
    });

    this.types = [{ label: 'Select Type', value: null }, ...commTypeOptions];
  }

  /**
   * @description load reason dropdown values based on type selection
   * @param commTypeOptions- string
   * @returns void
   */
  loadReasonByType(commTypeOptions: string): void {
    if (!commTypeOptions) {
      this.reason = [];
      return;
    }
    this.communicationForm.get('communicationReason').setValue(null);
    const reasonOptions = this.dropdownData[commTypeOptions].map(reason => {
      return {
        label: reason, value: reason
      };
    });

    this.reason = [{ label: 'Select Reason', value: null }, ...reasonOptions];
  }

  /**
   * @description show dialog on new entry click
   */
  showDialog(): void {
    this.display = true;
  }

  /**
   * @description On form submit method
   */
  onSubmit(communication: Communication): void {
    this.issubmitted = true;
    if (this.communicationForm.valid) {
      this.issubmitted = false;
      this.communicationForm.reset();
      if (!isNullOrUndefined(communication)) {
        if (!isNullOrUndefined(this.communicationData)
          && !isNullOrUndefined(this.communicationData.id)) {
          communication.taskId = this.communicationData.id;
          this.tasksService.saveCommunication(communication).subscribe(response => {
            if (!isNullOrUndefined(response)) {
              // const toastType = new ToastType();
              // toastType.message = 'Communication added successfully!';
              // toastType.summary = 'Success';
              // toastType.severity = 'success';
              // this.appSharedService.setToastMessage(toastType);
            }
          });
        }
      }
    }
  }

  /**
   * @description cancel method
   */
  onCancel(): void {
    this.display = false;
  }

  // method to get form control
  get communicationType(): FormControl {
    return this.communicationForm.get('communicationType') as FormControl;
  }

  get communicationReason(): FormControl {
    return this.communicationForm.get('communicationReason') as FormControl;
  }
}

