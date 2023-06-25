import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DecodeToken } from 'src/app/Modules/model';
import { NavbarComponent } from '../navbar/navbar.component';
import { SharedService } from '../SharedService/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild(NavbarComponent) navbar!: NavbarComponent;

  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex: any =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?/<>,.]).{8,}$/;

  IsDisable: boolean = false;
  invalidPassword: boolean = false;
  showAlert: boolean = false
  loginForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern(this.emailRegex),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(this.passwordRegex),
    ]),
  });

  constructor(
    private auth: AuthenticationService,
    private cookieService: CookieService,
    private router: Router,
    private shared:SharedService
  ) {}
  ngOnInit(): void {}

  // Login
  get getLogEmail() {
    return this.loginForm.controls.userName;
  }

  get getLogPassword() {
    return this.loginForm.controls.password;
  }

  login(event: Event) {
    console.log('Sign in');
    this.showAlert = false
    this.IsDisable = true;
    this.invalidPassword = false;
    this.auth.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log('login Successfully');

        this.IsDisable = false;

        this.cookieService.set(
          'Cookies',
          response.token,
          new Date(response.expiration)
        );

        this.shared.isSignin = true
        this.shared.setUsername()
        let role = this.shared.user.role
        if(role == 'Owner' || role == 'Admin'){
          this.router.navigate(['/AdminDashboard'])
        }else {
          this.router.navigate(['/']);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.IsDisable = false;
        // error
        if(err.error.status == 'Failed'){
          this.cookieService.set("email",String(this.getLogEmail.value))
          this.cookieService.set("token",err.error.token)
          this.router.navigate(['/verify'])
          console.log(err.error.token)
          console.log('Email Not Confirmed')
        }
        else if(err.status == 401){
        this.invalidPassword = true;
          console.log('Invalid Password')
        }else if(err.status == 500){
          this.showAlert = true
          console.log('Interrupted Network')
        }
        console.log(err)
      },
    });
  }

  loginDiscord(event: Event) {
    event.stopPropagation();
    console.log('Discord');
    this.auth.getDiscordLogin().subscribe({
      next: (respons: any) => {
        // console.log(respons)
        // console.log(DecodeToken(respons))
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
  closeAlert(){
    this.showAlert = false
  }
}
