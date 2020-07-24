import { Component, OnInit, ViewChild, ElementRef, OnChanges } from '@angular/core';
import { SelectItem } from 'primeng/api/selectitem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'srca-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  data: any;
  accountType: SelectItem[];
  selectDays: SelectItem[];
  selectedAccountType : 1
  constructor(private router:Router) { }

  ngOnInit() {
    this.pChartData();
    this.dropDownData();
  }
 
  dropDownData() {
    this.accountType = [
      { label: 'AD', value: 1 },
      { label: 'IFS', value: 2 },
      { label: 'PB', value: 3 }
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
  onCreateTask(){
    if(this.selectedAccountType == undefined){
      this.selectedAccountType = 1
    }
    console.log("dropdown value "+this.selectedAccountType)
    switch(this.selectedAccountType){
      case 1 :
     this.router.navigate(['create/ad-account/search'])  
    }
  }
   
}
