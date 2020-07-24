import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'srca-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  open = false
  items: MenuItem[];
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
    //console.log("currentUser 12" + this.currentUser);
  }

  ngOnInit(): void {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.authenticationService.getLoggedInUser();
    console.log(this.currentUser);
    this.loadMenu()
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  myFunc() {
    this.open = !this.open
    console.log(open)
  }


  loadMenu() {
    this.items = [
      {
        label: 'Sign Out', icon: 'pi pi-sign-out', command: () => this.logout()
      }
    ];
  }
}

