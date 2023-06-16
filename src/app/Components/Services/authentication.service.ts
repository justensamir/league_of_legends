import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{
  baseAddress: string = "http://amrelselenee-001-site1.htempurl.com/api/UserAuthentication/"
  loginRequestUrl: string = "Login"
  registerRequestUrl: string = "Register"
  confirmEmailRequestUrl: string = "ConfirmEmail"
  constructor(private http:HttpClient) { }
  ngOnInit(): void {

  }

  login(user:any){
    return this.http.post(this.baseAddress + "Login",user);
  }

  register(user:any){
    return this.http.post(this.baseAddress + "Register",user);
  }

  confirmEmail(confirm:any){
    return this.http.post(this.baseAddress + "ConfirmEmail",confirm);
  }

}
