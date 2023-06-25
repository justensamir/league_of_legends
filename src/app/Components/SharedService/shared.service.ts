import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { DecodeToken } from 'src/app/Modules/model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isSignin: boolean = false;
  user: {role: string, email: string, id: string} = {role: '', email: '', id: ''}
  userInfo: any
  token: string = ''
  constructor(private cookie:CookieService,private http:HttpClient) { }
  setUsername(){
    this.token = this.cookie.get('Cookies');
    if (this.token != '') {
      try {
        let decodedToken: any = DecodeToken(this.token);
        this.user.id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
        this.user.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
        this.user.email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        console.log(this.user)
        this.http
          .get('https://localhost:7255/api/UserAuthentication/GetUserById?Id=' + this.user.id)
          .subscribe({
            next: (respons: any) => {
              this.userInfo = respons
              this.isSignin = true
            },
            error: (err: any) => {},
          });
        // console.log(obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
        // console.log(obj.exp)

        // let date = new Date(obj.exp * 1000)
        // console.log(date)
      } catch (error) {}
    }
  }
}
