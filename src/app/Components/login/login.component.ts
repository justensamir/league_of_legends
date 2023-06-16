import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { CookieService } from 'ngx-cookie-service';
// import {Ng2TelInputModule} from 'ng2-tel-input';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex: any =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?/<>,.]).{8,}$/;
  // userLogin: {userName:string,password:string} = {userName:'',password:''}
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

  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(15),
      ]),
      phoneNumber: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailRegex),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.passwordRegex),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      role: new FormControl('User'),
    },
    this.passwordMatchValidator
  );

  constructor(private auth: AuthenticationService, private cookieService:CookieService) {}
  ngOnInit(): void {
    const inputElement = document.getElementById('phone')
    if(inputElement){
      intlTelInput(inputElement,{
        initialCountry:'US',
        separateDialCode:true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
      })
    }
  }

  passwordMatchValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      return { passwordMismatch: true };
    }

    return null;
  }

  // Login
  get getLogEmail() {
    return this.loginForm.controls.userName;
  }

  get getLogPassword() {
    return this.loginForm.controls.password;
  }

  login() {
    this.auth.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.cookieService.set("Cookies",response.token, new Date(response.expiration))
        // Navigate to home
        console.log(this.cookieService.get("Cookies"))
      },
      error: (err: any) => {
        console.error(err)
      }
    })
  }

  // Register
  get getRegFirstName() {
    return this.registerForm.controls.firstName;
  }
  get getRegLastName() {
    return this.registerForm.controls.lastName;
  }
  get getRegEmail() {
    return this.registerForm.controls.email;
  }
  get getRegPassword() {
    return this.registerForm.controls.password;
  }
  get getRegConfirmPassword() {
    return this.registerForm.controls.confirmPassword;
  }
  get getRegPhoneNumber() {
    return this.registerForm.controls.phoneNumber;
  }

  register() {
    console.log(this.registerForm.value)
    if(this.registerForm.status === "VALID"){
      var input = document.querySelector("#phone");
      let dialCode: any
      if(input !== null){
        var iti = window.intlTelInputGlobals.getInstance(input);
        dialCode = iti.getSelectedCountryData().dialCode;
      }
      // this.registerForm.controls.phoneNumber =`+${dialCode}${this.registerForm.controls.phoneNumber}`

      console.log(dialCode)
      this.auth.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (err: any) => {
          console.log(err.message)
        }
      })
    }
  }

  phoneChange(){
    var input = document.querySelector("#phone");
    if(input !== null){
      var iti = window.intlTelInputGlobals.getInstance(input);
      var country = iti.getSelectedCountryData();
      console.log(country)
    }
  }

}
