import { AuthenticationService } from './../Services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Component, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verification-form',
  templateUrl: './verification-form.component.html',
  styleUrls: ['./verification-form.component.css'],
})
export class VerificationFormComponent implements OnInit {
  codeRegx: any = /^{0-9}$/;
  verificationCode: string[] = ['', '', '', '', ''];
  confirm: { email: string; code: number; token: string } = {
    email: '',
    code: 0,
    token: '',
  };
  IsNotValidCode: boolean = false;
  IsDisable: boolean = true;
  checkCode: boolean = false;
  constructor(
    private cookie: CookieService,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.confirm.email = this.cookie.get('email');
    this.confirm.token = this.cookie.get('token');
    console.log(this.confirm.email);
    console.log(this.confirm.token);
  }

  move(e: any, prev: any, current: any, next: any) {
    let length = current.value.length;
    let maxLength = current.getAttribute('maxlength');

    if (length == maxLength) {
      if (next != '') {
        next.focus();
      }
    }

    if (e.key === 'Backspace') {
      if (prev != '') {
        prev.focus();
      }
    }
    let code = this.verificationCode.join('');
    this.confirm.code = Number(code);
    this.IsDisable = code.length == 5 ? false : true;
  }

  verify() {
    this.checkCode = true;
    this.IsDisable = true;
    this.auth.confirmEmail(this.confirm).subscribe({
      next: (response: any) => {
        this.IsNotValidCode = false
        this.cookie.delete("token")
        this.cookie.delete("email")
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your Email Verified Successfully',
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 1500);
      },
      error: (err: any) => {
        console.log(this.confirm)
        this.IsNotValidCode = true
        this.checkCode = false
        this.IsDisable = false
      }
    });
  }
}
