import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'tmt-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  cols: any[];
  data: any;
  first = 0;
  rows = 10;

  constructor(private httpClient: HttpClient) { }

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
      { field: 'dueDate', header: 'Due(IST)' },
      { field: '', header: '' }
    ];

  }

  getTaskList() {
    this.httpClient.get("assets/json/task-list.json").subscribe(data => {
      console.log(data);
      this.data = data;
    })
  }

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

}
