import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseAddress: string = 'https://localhost:7255/api/';

  constructor(private http:HttpClient, private shared:SharedService) { }

  filterAccounts(obj: any){
    return this.http.get(`${this.baseAddress}Accounts/filterAccounts?GameId=${obj.game_Id}&CategoryID=${obj.category_Id}&ServerID=${obj.server_Id}&RankID=${obj.rank_Id}`)
  }

  filterItems(obj: any){
    return this.http.get(`${this.baseAddress}Item/filterItems?GameId=${obj.game_Id}&CategoryID=${obj.category_Id}&ServerID=${obj.server_Id}&RankID=${obj.rank_Id}`)
  }

  getCart(userId: any){
    return this.http.get(`${this.baseAddress}Cart/GetCartByUSerID?Userid=${userId}`)
  }

  updateCart(userId:any, products:any){
    return this.http.post(`${this.baseAddress}Cart/UpdateCart`, {userid: userId, products: products})
  }
}
