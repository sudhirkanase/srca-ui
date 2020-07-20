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
      private authenticationService: AuthenticationService) { }
  
    ngOnInit(): void {
      this.authenticationService.currentUser.subscribe(x =>
        {
          console.log("test" + x);
          this.currentUser = x;
        });
      }
  
      logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
    
      myFunc(){
        this.open =!this.open
        console.log(open)
      }
}
