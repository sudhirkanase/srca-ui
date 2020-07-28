import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table/table';
import { HomeService } from 'src/app/home/services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'srca-my-task-list',
  templateUrl: './my-task-list.component.html',
  styleUrls: ['./my-task-list.component.scss']
})
export class MyTaskListComponent implements OnInit {

  cols: any[];
  data: any;
  first = 0;
  rows = 10;
  noOfRowsPerPage = 10;
  exportColumns: any[];
  contactCenterDetails: any;
  @ViewChild('dt', { static: false }) dt: Table;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit() {

    this.getTaskList();

    // Columns required
    this.cols = [
      { field: 'id', header: 'ID', width: '144px' },
      { field: 'taskType', header: 'Task Type', width: '144px' },
      { field: 'taskSpecific', header: 'Task Specifics', width: '144px' },
      { field: 'workflowStep', header: 'Workflow Step', width: '144px' },
      { field: 'accountNo', header: 'Account#', width: '144px' },
      { field: 'accountName', header: 'Account Name', width: '145px' },
      { field: 'requesterName', header: 'Requester', width: '145px' },
      { field: 'dueDate', header: 'Due(IST)', width: '145px' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

  }

  getTaskList() {
    this.homeService.getTaskList().subscribe(data => {
      this.data = data;
    });
  }

  // Methods for pagination
  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  isLastPage(): boolean {
    if (this.data) {
      return this.first === (this.data.length - this.rows);
    }
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  // Export to PDF
  exportPdf() {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.data);
        doc.save('myTaskList.pdf');
      });
    });
  }

  // Export to Excel
  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getTaskDataToString());
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'myTaskList');
    });
  }

  // Save the Excel File
  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      const EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getTaskDataToString() {
    const dataToString = [];
    for (const data of this.data) {
      data.id = data.id.toString();
      dataToString.push(data);
    }
    return dataToString;
  }


  globalSearch(searchValue) {
    this.dt.filterGlobal(searchValue, 'contains');
  }

  onEditClick(rowData) {
    this.contactCenterDetails = {
      accountNo: rowData.accountNo,
      taskID: rowData.id,
      accountAction: 'Update'
    };
    if (rowData.taskType === 'Contact Center') {
      this.router.navigateByUrl('/create/ad-account/contact-center', { state: { data: this.contactCenterDetails } });
    }
  }
}
