import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'srca-task-summary',
  templateUrl: './task-summary.component.html',
  styleUrls: ['./task-summary.component.scss']
})
export class TaskSummaryComponent implements OnInit {

  @Input() taskData: any;

  constructor() { }

  ngOnInit() {
  }

}
