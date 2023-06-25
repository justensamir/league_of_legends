import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../Services/authentication.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent {
  emailRegex: any = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  passwordRegex: any =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[!@#$%^&*()_+~`|}{[\]:;?/<>,.]).{8,}$/;
  subscription: any
  constructor(private auth:AuthenticationService){}



    adminForm = new FormGroup(
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
      role: new FormControl('Admin'),
    },
    this.passwordMatchValidator
  );


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

  addAdmin(){
    if(this.adminForm.valid){
      this.subscription = this.auth.register(this.adminForm.value).subscribe({
        next: (reponse : any) => {
          console.log('Admin Added')
        },
        error: (err: HttpErrorResponse) =>  {
          console.log('Error Happen')
        }
      })
    }
    else{
      console.log(this.adminForm)
    }
  }


  get getFirstName() {
    return this.adminForm.controls.firstName;
  }
  get getLastName() {
    return this.adminForm.controls.lastName;
  }
  get getEmail() {
    return this.adminForm.controls.email;
  }
  get getPassword() {
    return this.adminForm.controls.password;
  }
  get getConfirmPassword() {
    return this.adminForm.controls.confirmPassword;
  }
  get getPhoneNumber() {
    return this.adminForm.controls.phoneNumber;
  }
}
