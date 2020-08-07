import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'srca-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AuditComponent implements OnInit {
  columns: any[];
  auditList: any[];
  @Input() auditData: any;
  constructor() { }

  ngOnInit() {
    this.columns = [
      { field: 'Date', header: 'Date' },
      { field: 'User', header: 'User' },
      { field: 'AuditType', header: 'Audit Type' },
      { field: 'Action', header: 'Action' }
    ];

    this.auditList = [
      { Date: '08/04/2020 06:23:14 PM', User: 'SHAIKH TALAT (000224445)', AuditType: 'Assigning Task', Action: 'Entered Note: Text Note' },
      {
        Date: '08/04/2020 09:20:14 PM', User: 'SHAIKH TALAT (000224445)', AuditType: 'Creating Regular Task', Action: 'Talash Shaikh' +
          'assigned to account task  review maintainance summary entry'
      },
      {
        Date: '08/04/2020 10:03:14 PM', User: 'SHAIKH TALAT (000224445)', AuditType: 'Regular Task', Action: 'Talash Shaikh assigned ' +
          'to account task  review maintainance summary entry'
      },
      { Date: '08/04/2020 12:00:14 PM', User: 'SHAIKH TALAT (000224445)', AuditType: 'Assigning Task', Action: 'Entered Note: Text Note' },
      { Date: '08/04/2020 04:23:14 PM', User: 'SHAIKH TALAT (000224445)', AuditType: 'Assigning Task', Action: 'Entered Note: Text Note' }
    ];
  }

}
