import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tmt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
open = false
  constructor() { }

  ngOnInit(): void {
   
    }
    myFunc(){
      this.open =!this.open
      console.log(open)
    }
}
