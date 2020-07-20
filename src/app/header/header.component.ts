import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';

@Component({
  selector: 'tmt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  open = false

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    //console.log("currentUser 12" + this.currentUser);
  }

  ngOnInit(): void {
  
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.getLoggedInUser();
    console.log( this.currentUser );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  myFunc() {
    this.open = !this.open
    console.log(open)
  }
}
