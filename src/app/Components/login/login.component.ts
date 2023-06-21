import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex: any =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?/<>,.]).{8,}$/;

    IsDisable: boolean = false
  invalidEmailOrPassword: boolean = false

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


  constructor(private auth: AuthenticationService, private cookieService:CookieService, private router:Router) {}
  ngOnInit(): void {

  }

  // Login
  get getLogEmail() {
    return this.loginForm.controls.userName;
  }

  get getLogPassword() {
    return this.loginForm.controls.password;
  }

  login() {
    this.IsDisable = true
    this.invalidEmailOrPassword = false
    this.auth.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.IsDisable = false
        this.cookieService.set("Cookies",response.token, new Date(response.expiration))
        console.log(this.cookieService.get("Cookies"))
        // Navigate to home
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.IsDisable = false
        this.invalidEmailOrPassword = true
        // error
      }
    })
  }

}
