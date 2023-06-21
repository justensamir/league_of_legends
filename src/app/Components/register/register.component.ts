import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import * as intlTelInput from 'intl-tel-input';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  isExist: boolean = false
  IsDisable: boolean = false
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex: any =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?/<>,.]).{8,}$/;

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

  constructor(private auth: AuthenticationService, private cookieService:CookieService,private router:Router) {}
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
      this.IsDisable = true
      this.auth.register(this.registerForm.value).subscribe({
        next: (response: any) => {
          this.IsDisable = false
          this.isExist = false
          this.cookieService.set("email",String(this.getRegEmail.value))
          this.cookieService.set("token",response.token)
          this.router.navigate(['/verify'])
        },
        error: (err: any) => {
          console.log(err.message)
          this.IsDisable = false
          this.isExist = true
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
