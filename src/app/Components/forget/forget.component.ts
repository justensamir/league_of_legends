import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../Services/authentication.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
})
export class ForgetComponent {
  emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  codeRegex: RegExp = /^[0-9]{5}$/;
  passRegex: RegExp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?/<>,.]).{8,}$/;

  isNotValidEmail: boolean = false;
  isNotValidCode: boolean = false;
  isNotValidPass: boolean = false;
  isDisable: boolean = false;
  isConfirm: boolean = false;
  token: any
  email: any;
  code: any;
  pass: any;

  constructor(private auth: AuthenticationService, private router:Router) {}

  sendEmail() {
    if (!this.emailRegex.test(this.email)) {
      this.isNotValidEmail = true;
    } else {
      this.isNotValidEmail = false;
    }

    if (this.isConfirm == true) {
      if (!this.codeRegex.test(this.code)) {
        this.isNotValidCode = true;
      } else {
        this.isNotValidCode = false;
      }

      if (!this.passRegex.test(this.pass)) {
        this.isNotValidPass = true;
      } else {
        this.isNotValidPass = false;
      }
    }

    if (this.isConfirm == false && this.isNotValidEmail == false) {
      this.isDisable = true;
      this.isNotValidEmail = false;
      this.auth.forgetPassword(this.email).subscribe({
        next: (response: any) => {
          this.isConfirm = true;
          this.isNotValidEmail = false;
          this.isDisable = false;
          this.token = response.token
        },
        error: (err: any) => {
          this.isNotValidEmail = true;
          this.isDisable = false;
          console.log(err.message)
        },
      });
    } else if (
      this.isConfirm == true &&
      this.isNotValidEmail == false &&
      this.isNotValidCode == false &&
      this.isNotValidPass == false
    ) {
      this.isDisable = true;
      this.isNotValidEmail = false;
      this.auth.confirmPassword(this.email, this.code, this.pass, this.token).subscribe({
        next: (response: any) => {
          this.isNotValidCode = false;
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your Password Changed Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            this.router.navigate(['/signin']);
          }, 1500);
        },
        error: (err: any) => {
          this.isNotValidCode = true;
          this.isDisable = false;
        },
      });
    }
  }

  getEmail(event: Event) {
    let input = event.target as HTMLInputElement;
    this.email = input.value;
  }

  getCode(event: Event) {
    let input = event.target as HTMLInputElement;
    this.code = input.value;
  }

  getPass(event: Event) {
    let input = event.target as HTMLInputElement;
    this.pass = input.value;
  }
}
