import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedin: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        this.loggedInUser = auth.email;
        this.isLoggedin = true;
      } else {
        this.isLoggedin = false;
      }
    });
  }

  onLogoutClick() {
    this.authService.logout();
    this.flashMessage.show('You are Logged Out', {
      cssClass: 'alert-success',
      timeout: 5000,
    });
    this.router.navigate(['/login']);
  }
}
