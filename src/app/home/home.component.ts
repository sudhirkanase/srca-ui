import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cities1: SelectItem[];
  cities2: SelectItem[];
  cities3: SelectItem[];
  cities4: SelectItem[];
  text:string="Search"
  data: any;
  constructor() {
      this.data = {
          labels: ['A','B','C'],
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
  

  this.cities1 = [
    {label:'AD With Account', value:null},
    {label:'New York', value:{id:1, name: 'New York', code: 'NY'}}
];
this.cities2 = [
    {label:'My Tasks', value:null},
    {label:'New York', value:{id:1, name: 'New York', code: 'NY'}}
];
this.cities3 = [
    {label:'Past 30 Days', value:null},
    {label:'New York', value:{id:1, name: 'New York', code: 'NY'}}
];
this.cities4 = [
    {label:'Today', value:null},
    {label:'New York', value:{id:1, name: 'New York', code: 'NY'}}
]

}

ngOnInit(){

}
}
