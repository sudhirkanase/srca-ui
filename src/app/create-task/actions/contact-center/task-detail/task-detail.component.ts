import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'tmt-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  taskPriority:SelectItem[];

  constructor() { }

  ngOnInit() {

    this.taskPriority = [
      {label: 'Low', value: 1},
      {label: 'High', value: 2}
  ];
  }

}
