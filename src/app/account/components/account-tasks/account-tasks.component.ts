import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'srca-account-tasks',
  templateUrl: './account-tasks.component.html',
  styleUrls: ['./account-tasks.component.scss']
})
export class AccountTasksComponent implements OnInit {
  @Input() tasks = [];

  taskColumns: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.taskColumns = [
      { field: 'action', header: '' },
      { field: 'id', header: 'ID' },
      { field: 'accountName', header: 'Account Name' },
      { field: 'requesterName', header: 'Requester Name' },
      { field: 'taskType', header: 'Task Type' },
      { field: 'dueDate', header: 'Due Date' },
    ];
  }

  onViewIconClick(rowData: any) {
    const actionType = 'VIEW';
    const actionDetails: any = {
      accountNo: rowData.accountNo,
      taskID: rowData.id,
      actionType,
      actionName: rowData.taskType
    };
    if (rowData.taskType === 'Contact Center') {
      this.router.navigate(['action'], {
        state: { data: actionDetails },
        queryParams: { task: 'contact-center', type: actionType.toLowerCase() }
      });
    }
  }

}
