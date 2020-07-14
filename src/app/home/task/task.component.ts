import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'tmt-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  cities2: SelectItem[];
  cities3: SelectItem[];

  constructor() { }

  ngOnInit() {

    this.dropDownData();
  }

  dropDownData() {
    this.cities2 = [
      { label: 'My Tasks', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } }
    ];
    this.cities3 = [
      { label: 'Past 30 Days', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } }
    ];
  }

}
