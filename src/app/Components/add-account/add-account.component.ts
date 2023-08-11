
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../Services/admin.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})

export class AddAccountComponent implements OnInit{
  @Input() accountId:any
  @Output() editFlag: boolean = true
  games: {id:any, name: string}[] = [{id:1, name: 'LEGUE OF LEGENDS'}]
  servers: any
  categories: any
  ranks: any
  IsDisable: boolean = false

  account = new FormGroup(
    {
      id: new FormControl(0),

      name: new FormControl('', [
        Validators.required,
      ]),

      description: new FormControl('', [
        Validators.required,
      ]),

      price: new FormControl('', [
        Validators.required,
      ]),

      imgUrl: new FormControl('', [
        Validators.required,
      ]),

      server_Id: new FormControl('', [
        Validators.required,
      ]),

      category_Id: new FormControl('', [
        Validators.required,
      ]),

      rank_Id: new FormControl('', [
        Validators.required,
      ]),

      game_Id: new FormControl('', [
        Validators.required,
      ]),

    }
  );

  get accountName(){
    return this.account.controls.name
  }
  get accountPrice(){
    return this.account.controls.price
  }
  get accountGame(){
    return this.account.controls.game_Id
  }
  get accountServer(){
    return this.account.controls.server_Id
  }
  get accountCategory(){
    return this.account.controls.category_Id
  }
  get accountRank(){
    return this.account.controls.rank_Id
  }
  get accountImageUrl(){
    return this.account.controls.imgUrl
  }
  get accountDescription(){
    return this.account.controls.description
  }

  constructor(private service:AdminService, private admin:AdminService, public shared: SharedService){}
  ngOnInit(): void {
    console.log("account ID " + this.accountId)
    this.admin.getAllServers().subscribe({
      next: (response: any) => {
        this.servers = response
      }
    })

    this.admin.getAllAccCategories().subscribe({
      next: (response: any) => {
        this.categories = response
      }
    })

    this.admin.getAllRanks().subscribe({
      next: (response: any) => {
        this.ranks = response
      }
    })

    if(this.accountId != 0){
      this.admin.getAccountById(this.accountId).subscribe({
        next: (response: any) => {
          console.log(response)
          let obj = {
            id: response.id,
            name: response.name,
            price: response.price,
            description: response.description,
            imgUrl: response.imgUrl,
            category_Id: response.categoryId,
            rank_Id: response.rankId,
            server_Id: response.serverId,
            game_Id: this.games[0].id
          }
          this.account.setValue(obj)
          console.log(this.account.value)

        }
      })
    }
  }


  manageAccount(){
    if(this.accountId == 0){
      this.addNewAccount()
    }else{
      this.editAccount()
    }
  }

  addNewAccount(){
    this.IsDisable = true
    if(this.account.valid){
      this.admin.addAccount(this.account.value).subscribe({
        next: (response:any) => {
          console.log('Account Added')
          this.IsDisable = false
        },
        error: (err:any) => {
          this.IsDisable = false
          console.log(err)
        }
      })
    }else{
      this.IsDisable = false
    }
  }


  editAccount(){
    this.IsDisable = true

    if(this.account.valid){
      this.admin.editAccount(this.accountId,this.account.value).subscribe({
        next: (response:any) => {
          console.log('Account updated successfully')
          this.IsDisable = false
          this.shared.editAccount = false
          this.shared.getAccounts(this.games[0].id)
        },
        error: (err: HttpErrorResponse) => {
          this.IsDisable = false
          if(err.status == 200){
            this.editFlag = false
            console.log('Account updated successfully')
            this.shared.editAccount = false
            this.shared.getAccounts(this.games[0].id)
          }
          console.log(err)
        }
      })
    }else{
      this.IsDisable = false
    }
  }
}
