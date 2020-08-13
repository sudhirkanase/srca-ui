
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { COMMUNICATION_DROPDOWN_DATA } from './../../../app.constants';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
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
  cols: any[];
  communicationForm: FormGroup;
  @Input() communicationData: any;
  communicationList: any[];

  constructor(
    private tasksService: TasksService,
    private appSharedService: AppSharedService) { }

  ngOnInit() {

    if (!isNullOrUndefined(this.communicationData)) {
      this.communicationList = this.communicationData.communications;
    }
    this.dropdownData = COMMUNICATION_DROPDOWN_DATA;
    this.initializeCommunicationForm();
    this.loadCommunicationType();

    this.cols = [
      { field: 'communicationType', header: 'Communication Type' },
      { field: 'communicationReason', header: 'Communication Reason' },
      { field: 'name', header: 'Name' },
      { field: 'number', header: 'Number' },
      { field: 'followUpDate', header: 'Follow Up Date' },
      { field: 'notes', header: 'Notes' }
    ];
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
   * @param communication - communication type
   */
  onSubmit(communication: Communication): void {
    this.issubmitted = true;
    if (this.communicationForm.valid) {
      this.issubmitted = false;
      this.communicationForm.reset();
      if (!isNullOrUndefined(communication)) {
        if (!isNullOrUndefined(this.communicationData)
          && !isNullOrUndefined(this.communicationData.id)
          && !isNullOrUndefined(this.communicationData.accountDetail)
          && !isNullOrUndefined(this.communicationData.accountDetail.accountNumber)) {
          communication.taskId = this.communicationData.id;
          communication.accountNumber = this.communicationData.accountDetail.accountNumber;
          this.tasksService.saveCommunication(communication).subscribe(response => {
            if (!isNullOrUndefined(response)) {
              this.communicationList = response;
              this.onCancel();
            }
          });
        }
      }
    }
  }

  /**
   * @description To delete communication data by communicationId
   * @param rowData - Communication type
   */
  public removeCommunication(rowData: Communication): void {
    console.log(rowData);
    if (!isNullOrUndefined(rowData) && !isNullOrUndefined(rowData.communicationId)) {
      this.tasksService.deleteCommunicationByTaskId(rowData.communicationId).subscribe(response => {
        if (!isNullOrUndefined(response)) {
          this.communicationList = response;
        }
      });
    }
  }

  /**
   * @description To preview communication
   * @param rowData - Communication type
   */
  viewCommunication(rowData: Communication): void {
    console.log(rowData);
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

