import { Component, OnInit, Output, Input } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent  implements OnInit{
  gameId: any = 1
  @Output() accountId: any

  constructor(private admin:AdminService, public shared:SharedService){}
  ngOnInit(): void {
    this.shared.getAccounts(this.gameId)
  }

  deleteAccount(id:any, index: any){
    this.admin.deleteAccount(id).subscribe({
      next: (response: any) => {
        console.log(response)
        this.removeAccount(index)
      },
      error: (err: any) => {
        if(err.status == 200){
          this.removeAccount(index)
          console.log('account deleted successfully')
        }else{
          console.log(err)
        }
      }
    })
  }

  removeAccount(index: any){
    this.shared.accounts = this.shared.accounts.filter((item, i) => index != i)
  }

  editAccount(id: any){
    this.accountId = id
    this.shared.editAccount = true
  }
}


