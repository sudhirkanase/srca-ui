import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AUDIT_COLUMNS, AUDIT_FILTER_OPTIONS } from 'src/app/app.constants';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { Audit } from '../../model/audit';
import { BaseService } from '../../../services/base.service';
import { UserInfoBean } from 'src/app/beans/userinfo-bean';
import { formatDate } from '@angular/common';

@Component({
  selector: 'srca-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  columns: any[];
  auditList: any[];
  filterOptions: SelectItem[];
  addNoteForm: FormGroup;
  display: boolean = false;
  isSubmitted = false;
  loggedInUserData:UserInfoBean;

  @Input() auditData: any;
  @ViewChild('dt', { static: false }) table: Table;

  constructor(    private baseService: BaseService
    ) { }

  showDialog() {
      this.display = true;
  }
  onSubmit(notes: Audit): void {
    this.isSubmitted = true;
    if (this.addNoteForm.valid) {
      const currentDate= new Date();
      this.isSubmitted = false;
      this.display = false;
      this.addNoteForm.reset();
      if (!isNullOrUndefined(notes.notes)) {
        this.loggedInUserData=this.baseService.getLoggedInUser();
          this.auditList.push({
            date: formatDate(currentDate, 'MM/dd/yyyy hh:mm:ss a', 'en-US', '+0530'), 
            user: this.loggedInUserData.username, auditType: 'Notes & Alerts',
            action: 'Entered Note: ' + notes.notes
          });
      }
      }
    }
  

  /**
   * @description cancel method
   */
  onCancel(): void {
    this.display = false;
    this.addNoteForm.reset();
  }
  initializeAddNoteForm(): void {
    this.addNoteForm = new FormGroup({
      notes: new FormControl(null, Validators.required),
    });
  }

  ngOnInit() {
    this.initializeAddNoteForm();
    this.columns = AUDIT_COLUMNS;
    this.filterOptions = AUDIT_FILTER_OPTIONS;
    this.auditList = [
      {
        date: '08/04/2020 06:23:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Notes & Alerts',
        action: 'Entered Note: Text Note'
      },
      {
        date: '08/04/2020 09:20:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Edits',
        action: 'Talash Shaikh assigned to account task  review maintainance summary entry'
      },
      {
        date: '08/04/2020 10:03:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Emails',
        action: 'Talash Shaikh assigned to account task  review maintainance summary entry'
      },
      {
        date: '08/04/2020 12:00:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Documents',
        action: 'Added document'
      },
      {
        date: '08/04/2020 04:23:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Workflow',
        action: 'Assigned to admin'
      }
    ];
  }

  onAuditTypeChange(event: any): void {
    this.table.filter(event.value, 'auditType', 'in');
  }

}
