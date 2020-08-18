import { Component, OnInit, Input, ViewChild, OnChanges, DoCheck, SimpleChanges } from '@angular/core';
import { AUDIT_COLUMNS, AUDIT_FILTER_OPTIONS } from 'src/app/app.constants';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Audit } from '../../model/audit';
import { BaseService } from '../../../services/base.service';
import { UserInfoBean } from 'src/app/beans/userinfo-bean';
import { formatDate } from '@angular/common';
import { TasksService } from '../../services/tasks.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'srca-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit, OnChanges {
  columns: any[];
  auditList: any[];
  filterOptions: SelectItem[];
  addNoteForm: FormGroup;
  display = false;
  isSubmitted = false;
  loggedInUserData: UserInfoBean;
  @Input() auditData: any;
  @ViewChild('dt', { static: false }) table: Table;
  @Input() auditListData: any;

  constructor(private taskService: TasksService, private baseService: BaseService
  ) { }

  ngOnInit() {
    this.initializeAddNoteForm();
    this.columns = AUDIT_COLUMNS;
    this.filterOptions = AUDIT_FILTER_OPTIONS;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.auditListData.previousValue !== changes.auditListData.currentValue) {
      this.auditList = this.auditListData;
    }
  }

  initializeAddNoteForm(): void {
    this.addNoteForm = new FormGroup({
      action: new FormControl(null, Validators.required),
    });
  }

  onSubmit(audit: Audit): void {
    this.isSubmitted = true;
    if (this.addNoteForm.valid) {
      const currentDate = new Date();
      this.isSubmitted = false;
      this.loggedInUserData = this.baseService.getLoggedInUser();
      const auditRequest: Audit = {
        taskId: this.auditData.id,
        date: formatDate(currentDate, 'MM/dd/yyyy hh:mm:ss a', 'en-US', '+0530'),
        user: this.loggedInUserData.username,
        auditType: 'Notes & Alerts',
        action: 'Entered Note: ' + audit.action
      };
      this.taskService.saveAuditDetails(auditRequest).subscribe((auditData: Audit[]) => {
        this.auditList = auditData;
        this.display = false;
      });
    }
  }

  /**
   * @description cancel method
   */
  onCancel(): void {
    this.display = false;
    this.addNoteForm.reset();
  }

  onAuditTypeChange(event: any): void {
    this.table.filter(event.value, 'auditType', 'in');
  }

}
