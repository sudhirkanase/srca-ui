import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AUDIT_COLUMNS, AUDIT_FILTER_OPTIONS } from 'src/app/app.constants';
import { Table } from 'primeng/table';
import { SelectItem } from 'primeng/api';
@Component({
  selector: 'srca-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  columns: any[];
  auditList: any[];
  filterOptions: SelectItem[];

  @Input() auditData: any;
  @ViewChild('dt', { static: false }) table: Table;

  constructor() { }

  ngOnInit() {
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
    console.log('event ', event);
    this.table.filter(event.value, 'auditType', 'in');
  }

}
