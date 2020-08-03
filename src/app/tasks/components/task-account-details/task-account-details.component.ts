import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'srca-task-account-details',
  templateUrl: './task-account-details.component.html',
  styleUrls: ['./task-account-details.component.scss']
})
export class TaskAccountDetailsComponent implements OnInit {

  @Input() accountDetail: any;

  constructor() { }

  ngOnInit() {
  }

}
