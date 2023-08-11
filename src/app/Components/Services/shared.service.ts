import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Injectable } from '@angular/core';
import { DecodeToken } from 'src/app/Modules/model';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isSignin: boolean = false;
  user: {role: string, email: string, id: string} = {role: '', email: '', id: ''}
  userPermissions: {
    Add_Item: boolean,
    Edit_Item: boolean,
    Delete_Item: boolean,
    Add_Account: boolean,
    Edit_Account: boolean,
    Delete_Account: boolean,
    Complains: boolean
  } = {
    Add_Item: false,
    Edit_Item: false,
    Delete_Item: false,
    Add_Account: false,
    Edit_Account: false,
    Delete_Account: false,
    Complains: false
  }
  userInfo: any
  token: string = ''
  editItem: boolean = false
  items: any[] = []
  editAccount: boolean = false
  accounts: any[] = []
  cartProducts: {key:string,value:number}[] = []

    constructor(private cookie:CookieService,private http:HttpClient, private router: Router) { }
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
              if(this.user.role == "Owner" || this.user.role == "Admin"){
                this.router.navigate(['/AdminDashboard'])
              }
            },
            error: (err: any) => {},
          });
        this.getPermissions(this.user.email)
      } catch (error) {}
    }
  }

  getItems(gameId:any){
    this.http.get(`https://localhost:7255/api/Item/GetProducts?GameID=${gameId}`).subscribe({
      next: (response: any) => {
        this.items = response
      }
    })
  }

  getAccounts(gameId:any){
    this.http.get(`https://localhost:7255/api/Accounts/GetProducts?GameID=${gameId}`).subscribe({
      next: (response: any) => {
        this.accounts = response
      }
    })
  }

  getPermissions(userEmail: any){
    this.http.get('https://localhost:7255/api/Owner/GetAdminPermissions?Email=' + userEmail).subscribe({
      next: (response: any) => {
        console.log(response)
        for(let i=0;i < response.length;i++){
          console.log("response of " + i,response[i])
          if(response[i].permissionText == "Add_Item"){
            this.userPermissions.Add_Item = true
          }
          else if(response[i].permissionText == "Edit_Item"){
            this.userPermissions.Edit_Item = true
          }
          else if(response[i].permissionText == "Delete_Item"){
            this.userPermissions.Delete_Item = true
          }
          else if(response[i].permissionText == "Add_Account"){
            this.userPermissions.Add_Account = true
          }
          else if(response[i].permissionText == "Edit_Account"){
            this.userPermissions.Edit_Account = true
          }
          else if(response[i].permissionText == "Delete_Account"){
            this.userPermissions.Delete_Account = true
          }
          else if(response[i].permissionText == "Complains"){
            this.userPermissions.Complains = true
          }
        }
        console.log("user Permissions",this.userPermissions)
      }
    })
  }
}
