import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskService } from '../task.service';
import { Table } from 'primeng/table/table';
import { HomeService as HomeService } from 'src/app/services/home/home-data.service';

@Component({
  selector: 'tmt-my-task-list',
  templateUrl: './my-task-list.component.html',
  styleUrls: ['./my-task-list.component.scss']
})
export class MyTaskListComponent implements OnInit {

  cols: any[];
  data: any;
  first = 0;
  rows = 10;
  exportColumns: any[];
  @ViewChild('dt', { static: false }) dt:Table;

  constructor(private homeService: HomeService) { }

  ngOnInit() {

    this.getTaskList();

    //Columns required
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'taskType', header: 'Task Type' },
      { field: 'taskSpecific', header: 'Task Specifics' },
      { field: 'workflowStep', header: 'Workflow Step' },
      { field: 'accountNo', header: 'Account#' },
      { field: 'accountName', header: 'Account Name' },
      { field: 'requesterName', header: 'Requester' },
      { field: 'dueDate', header: 'Due(IST)' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

  }

  getTaskList() {
    this.homeService.getTaskList().subscribe(data =>{
      console.log(data);
      this.data = data;
    })
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
    return this.first === (this.data.length - this.rows);
  }

  isFirstPage(): boolean {
    return this.first === 0;
  }

  //Export to PDF
  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(this.exportColumns, this.data);
        doc.save('myTaskList.pdf');
      })
    })
  }

  //Export to Excel
  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.getTaskDataToString());
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "myTaskList");
    });
  }

  //Save the Excel File
  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getTaskDataToString() {
    let dataToString = [];
    for (let data of this.data) {
      data.id = data.id.toString();
      dataToString.push(data);
    }
    return dataToString;
  }


  globalSearch(searchValue) {
    this.dt.filterGlobal(searchValue, 'contains');
  }

}
