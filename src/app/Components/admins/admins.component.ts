import { Component, OnInit, OnDestroy } from '@angular/core';
import { OwnerServiceService } from '../Services/owner-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit{
  admins: any[] = []
  load:boolean = true
  subscription: any
  
  constructor(private ownerService:OwnerServiceService){}

  ngOnInit(): void {
    // Load All Admins
    console.log(this.load)
    this.subscription = this.ownerService.getAllAdmins().subscribe({
      next: (response: any) => {
        this.load = false
        this.admins = response
        console.log(this.admins)
        console.log(this.load)
      }
    })
  }

  block(event:Event, index:number){
    let input = event.target as HTMLInputElement
    let id = this.admins[index].id
    if(input.checked){
      this.blockAdmin(id,index)
    }else{
      this.unBlockAdmin(id,index)
    }
  }

  blockAdmin(id:string,index:number){
    this.admins[index].lockoutEnabled = true
      this.ownerService.blockAdmin(id).subscribe({
        next: (response: any) => {
          console.log('Admin Blocked')
          this.admins[index].lockoutEnabled = true
        },
        error: (err: any) => {
          if(err.status == 200){
            console.log('Admin Blocked')
            this.admins[index].lockoutEnabled = true
          }else{
            console.log("Can't Block this Admin")
            this.admins[index].lockoutEnabled = false
          }
        }
      })
  }

  unBlockAdmin(id:string, index:number){
    this.admins[index].lockoutEnabled = false

    this.ownerService.unBlockAdmin(id).subscribe({
        next: (response: any) => {
          console.log('Admin UnBlocked')
          this.admins[index].lockoutEnabled = false
        },
        error: (err: any) => {
          if(err.status == 200){
            console.log('Admin UnBlocked')
            this.admins[index].lockoutEnabled = false
          }
          else{
            console.log("Can't unBlock this Admin")
            this.admins[index].lockoutEnabled = true
          }
        }
      })
  }

  viewAdminActions(email:string){
    this.ownerService.getAdminActions(email).subscribe({
      next: (response:any) => {
        console.log(response)
      },
      error: (err:any) => {

      }
    })
  }
}
