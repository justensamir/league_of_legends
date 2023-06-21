import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnInit {
  baseAddress: string = 'https://localhost:7255/api/UserAuthentication/';

  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  login(user: any) {
    return this.http.post(this.baseAddress + 'Login', user);
  }

  register(user: any) {
    return this.http.post(this.baseAddress + 'Register', user);
  }

  confirmEmail(confirm: any) {
    return this.http.post(this.baseAddress + 'ConfirmEmail', confirm);
  }

  forgetPassword(email: any) {
    return this.http.put(this.baseAddress + 'ForgetPassword', { email: email });
  }

  confirmPassword(Email: string, Code: number, Password: string, Token:string) {
    let obj = {
      email: Email,
      code: Code,
      token: Token,
      newPassword: Password
    }
    
    console.log(obj)
    return this.http.post(this.baseAddress + 'ConfirmPassword', obj);
  }

  resendCode(Email: string){
    return this.http.post(this.baseAddress + 'ReSendCode', {email: Email})
  }
}
