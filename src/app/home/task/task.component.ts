import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { MyTaskListComponent } from './my-task-list/my-task-list.component';

@Component({
  selector: 'tmt-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  tasks: SelectItem[];
  cities3: SelectItem[];
  
  @Output() exportToPdfEvent = new EventEmitter();
  @ViewChild('myTaskList', { static: false }) myTaskList:MyTaskListComponent;

  constructor() { }

  ngOnInit() {
    this.dropDownData();
  }

  dropDownData() {
    this.tasks = [
      {label: 'My Tasks', value: 1},
      {label: 'Task Work Queue', value: 2},
      {label: 'Workflow Step Work Queue', value: 3},
      {label: 'Employee Work Queue', value: 4},
      {label: 'My Completed', value: 5}
  ];
    this.cities3 = [
      { label: 'Past 30 Days', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } }
    ];
  }

  // Method call to exportPdf method of MyTaskList Component
  exportToPdf() {
    this.myTaskList.exportPdf();
  }

  // Method call to exportExcel method of MyTaskList Component
  exportToExcel() {
    this.myTaskList.exportExcel();
  }

}
