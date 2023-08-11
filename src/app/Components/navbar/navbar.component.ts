import { SharedService } from '../Services/shared.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private cookie: CookieService,
    private router: Router,
    public shared:SharedService
  ) {}

  ngOnInit(): void {
    this.shared.setUsername()
  }

  signout() {
    this.cookie.delete('Cookies');
    this.router.navigate(['/signin']);
    this.shared.isSignin = false;
    this.shared.user = {role: '', email: '', id: ''}
  }
}
