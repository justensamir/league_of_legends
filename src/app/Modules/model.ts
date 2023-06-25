import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './../Components/Services/authentication.service';
import  jwt_decode from 'jwt-decode';
export function DecodeToken(token: string): string {
  return jwt_decode(token);
}

export class auth{
  static token: any
  static cookie: any
  static http: any
  constructor(private _http:HttpClient,private _cookie:CookieService)
  {
    auth.cookie = this._cookie
    auth.http = this._http

  }
  static getUser(): any{
    try{
      auth.token = auth.cookie.get('Cookies')
      let obj:any = DecodeToken(auth.token)
      return auth.http.get('https://localhost:7255/api/UserAuthentication/GetUserById?Id=' + obj['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'])
    }catch(err:any){
      return null
    }
  }
}
