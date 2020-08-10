import { Component, OnInit, Input } from '@angular/core';
import {AUDIT_COLUMNS, AUDIT_FILTER_OPTIONS} from 'src/app/app.constants';
@Component({
  selector: 'srca-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  columns: any[];
  auditList: any[];
  filterOptions: any[];
  @Input() auditData: any;
  constructor() { }

  ngOnInit() {
    this.columns = AUDIT_COLUMNS;
    this.filterOptions = AUDIT_FILTER_OPTIONS;
    this.auditList = [
      { date: '08/04/2020 06:23:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Assigning Task', action: 'Entered Note: Text Note' },
      {
        date: '08/04/2020 09:20:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Creating Regular Task', action: 'Talash Shaikh' +
          'assigned to account task  review maintainance summary entry'
      },
      {
        date: '08/04/2020 10:03:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Regular Task', action: 'Talash Shaikh assigned ' +
          'to account task  review maintainance summary entry'
      },
      { date: '08/04/2020 12:00:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Assigning Task', action: 'Entered Note: Text Note' },
      { date: '08/04/2020 04:23:14 PM', user: 'SHAIKH TALAT (000224445)', auditType: 'Assigning Task', action: 'Entered Note: Text Note' }
    ];
  }

}