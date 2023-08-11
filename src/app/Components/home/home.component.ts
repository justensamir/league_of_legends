import { Component, OnDestroy, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AdminService } from '../Services/admin.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../Services/user.service';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{
  products:any[] = []
  accounts: any[] = []
  items: any[] = []
  servers: any
  ranks: any
  productCategories: any
  showFilter: boolean = false

  filter = new FormGroup(
    {
      server_Id: new FormControl('0'),

      category_Id: new FormControl('0'),

      rank_Id: new FormControl('0'),

      game_Id: new FormControl('1'),
    }
  );

  categories: {all: boolean, accounts:boolean, items:boolean} = {all: true, accounts:false, items:false}
  constructor(private admin:AdminService, private user:UserService, public shared: SharedService){}
  
  ngOnDestroy(): void {
    this.updateCart()
  }

  ngOnInit(): void {
    AOS.init();
    this.getAllProducts()
    this.getRanks()
    this.getServers()
  }

  resetCategories(){
    this.categories = {all: false, accounts:false, items:false}
  }

  getItems(){
    this.resetCategories()
    this.categories.items = true
    this.admin.getAllItems(1).subscribe({
      next: (response: any) => {
        this.items = response
      }
    })
    this.getCategories()
  }

  getAccounts(){
    this.resetCategories()
    this.categories.accounts = true
    this.admin.getAllAccounts(1).subscribe({
      next: (response: any) => {
        this.accounts = response
      }
    })
    this.getCategories()
  }

  getAllProducts(){
    this.resetCategories()
    this.categories.all = true
    this.admin.getAllAccounts(1).subscribe({
      next: (response: any) => {
        this.accounts = response
      }
    })

    this.admin.getAllItems(1).subscribe({
      next: (response: any) => {
        this.items = response
        this.products = this.items.concat(this.accounts)

        console.log(this.products)
      }
    })
  }

  filterProducts(){
    if(this.categories.items){
      this.user.filterItems(this.filter.value).subscribe({
        next: (response: any) => {
          this.items = response
        }
      })
    }else if(this.categories.accounts){
      this.user.filterAccounts(this.filter.value).subscribe({
        next: (response: any) => {
          this.accounts = response
        }
      })
    }else{
      this.user.filterItems(this.filter.value).subscribe({
        next: (response: any) => {
          this.products = response
        }
      })

      this.user.filterAccounts(this.filter.value).subscribe({
        next: (response: any) => {
          this.products = this.products.concat(response)
        }
      })
    }
  }

  setFilter(){
    this.showFilter = !this.showFilter
  }

  getServers(){
    this.admin.getAllServers().subscribe({
      next: (response: any) => {
        this.servers = response
      }
    })
  }

  getRanks(){
    this.admin.getAllRanks().subscribe({
      next: (response: any) => {
        this.ranks = response
      }
    })
  }

  getCategories(){
    if(this.categories.items){
      this.admin.getAllItemCategories().subscribe({
        next: (response: any) => {
          this.productCategories = response
        }
      })
    }
    else if(this.categories.accounts){
      this.admin.getAllAccCategories().subscribe({
        next: (response: any) => {
          this.productCategories = response
        }
      })
    }
  }

  getCart(){
    console.log(this.shared.cartProducts)
    this.user.getCart(this.shared.user.id).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }

  updateCart(){
    this.user.updateCart(this.shared.user.id,this.shared.cartProducts).subscribe({
      next: (response: any) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      },
    })
  }
}


