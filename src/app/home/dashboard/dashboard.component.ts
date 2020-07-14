import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'tmt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  cities1: SelectItem[];
  cities4: SelectItem[];

  constructor() { }

  ngOnInit() {
    this.pChartData();
    this.dropDownData();
  }

  dropDownData() {
    this.cities1 = [
      { label: 'AD With Account', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } }
    ];

    this.cities4 = [
      { label: 'Today', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } }
    ]
  }

  pChartData() {
    this.data = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#7c219c",
            "#31bd10",
            "#c42115"
          ],
          hoverBackgroundColor: [
            "#7c219c",
            "#31bd10",
            "#c42115"
          ]
        }]
    };
  }

}
