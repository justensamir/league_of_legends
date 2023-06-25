import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerServiceService {
  baseAddress: string = 'https://localhost:7255/api/Owner/';

  constructor(private http:HttpClient) { }

  getAllAdmins(){
    return this.http.get(this.baseAddress + 'GetAllAdmins')
  }

  // --------------------------------------------
  // Admin Actions                              |
  // --------------------------------------------

  getAllAdminsAction(){
    return this.http.get(this.baseAddress + 'GetAllAdminAction')
  }

  getAdminActions(email:string){
    return this.http.get(this.baseAddress + 'GetAdminActions?Email=' + email)
  }

  // --------------------------------------------
  // Admin Block & UnBlock                      |
  // --------------------------------------------
  blockAdmin(userId:any){
    return this.http.put(this.baseAddress + 'BlockAdmin?UserId='+userId, null)
  }

  unBlockAdmin(userId:any){
    return this.http.put(this.baseAddress + 'UnBlockAdmin?UserId='+userId, null)
  }

  // --------------------------------------------
  // Admin Permissions                          |
  // --------------------------------------------

  // obj = {email:string,permission:string}
  AddPermission(obj:any){
    return this.http.post(this.baseAddress + 'AddPermission', obj)
  }

  // obj = {email:string,permission:string}
  RemovePermission(obj:any){
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: obj // pass the object as the body of the request
    };
    return this.http.delete(this.baseAddress + 'RemovePermission', options);
  }

  getAdminPermissions(email:string){
    return this.http.get(this.baseAddress + 'GetAdminPermissions?Email=' + email)
  }

  // --------------------------------------------
  // Top Ten This Month & Overall               |
  // --------------------------------------------

  getTopTenThisMonth(){
    return this.http.get(this.baseAddress + 'GetTopTenThisMonth')
  }

  getTopTen(){
    return this.http.get(this.baseAddress + 'GetTopTen')
  }

}
