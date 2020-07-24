import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';

@Component({
  selector: 'srca-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  accountType: SelectItem[];
  selectDays: SelectItem[];

  constructor() { }

  ngOnInit() {
    this.pChartData();
    this.dropDownData();
  }

  dropDownData() {
    this.accountType = [
      { label: 'AD With Account', value: 1 },
      { label: 'IFS With Account', value: 2 },
      { label: 'PB With Account', value: 3 }
      //{ label: 'IFS Without Account', value: 3 },
      //{ label: 'PB With Client/Account', value: 4 },
      //{ label: 'PB Without Client/Account', value: 5 },
      //{ label: 'PB Compliance', value: 6 },
      //{ label: 'PB Group Services', value: 7 }
    ];

    this.selectDays = [
      { label: 'Today', value: 1 },
      { label: 'Past 10 days', value: 2 },
      { label: 'Past 30 days', value: 3 },
      { label: 'Past 45 days', value: 4 },
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
