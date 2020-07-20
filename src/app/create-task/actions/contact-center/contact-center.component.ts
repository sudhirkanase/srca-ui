import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'tmt-contact-center',
  templateUrl: './contact-center.component.html',
  styleUrls: ['./contact-center.component.scss']
})
export class ContactCenterComponent implements OnInit {

  accountNumber: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap
      .pipe(map(() => window.history.state))
      .subscribe(state => {
        this.accountNumber = state && state.accountNumber;

        // if account number is not present/invalid, return to search
        if (!this.accountNumber) {
          this.location.back();
          return;
        }
      });
  }
}
