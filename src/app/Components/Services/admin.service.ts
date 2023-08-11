import { SharedService } from './shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseAddressAccount: string = 'https://localhost:7255/api/Accounts/';
  baseAddressItem: string = 'https://localhost:7255/api/Item/';
  constructor(private http:HttpClient, private shared:SharedService) { }

  // --------------------------------------------
  // Account Service                            |
  // --------------------------------------------
  getAllAccounts(gameId: any){
    return this.http.get(this.baseAddressAccount + `GetProducts?GameID=${gameId}`)
  }

  getAccountById(id:any){
    return this.http.get(this.baseAddressAccount + `GetProductByID?id=${id}`)
  }

  addAccount(obj: any){
    return this.http.post(this.baseAddressAccount + 'CreateProduct',obj)
  }

  editAccount(id:any, obj:any){
    return this.http.put(this.baseAddressAccount + `UpdateProduct?id=${id}`,obj)
  }

  deleteAccount(id:any){
    return this.http.delete(this.baseAddressAccount + `DeleteProduct?id=${id}`)
  }

  // --------------------------------------------
  // Item Service                               |
  // --------------------------------------------

  getAllItems(gameId: any){
    return this.http.get(this.baseAddressItem + `GetProducts?GameID=${gameId}`)
  }

  getItemById(id:any){
    return this.http.get(this.baseAddressItem + `GetProductByID?id=${id}`)
  }

  addItem(obj: any){
    console.log(obj)
    return this.http.post(this.baseAddressItem + 'CreateProduct',obj)
  }

  editItem(id:any, obj:any){
    return this.http.put(this.baseAddressItem + `UpdateProduct?id=${id}`,obj)
  }

  deleteItem(id:any){
    return this.http.delete(this.baseAddressItem + `DeleteProduct?id=${id}`)
  }

  // --------------------------------------------
  // Server, Category, Rank Service             |
  // --------------------------------------------
  addServerOrRank(model: string, name:any){
    return this.http.post(this.baseAddressAccount + `AddRankOrCategoryOrServer?model=${model}&name=${name}`,null)
  }

  addAccountCategory(model: string, name:any){
    return this.http.post(this.baseAddressAccount + `AddRankOrCategoryOrServer?model=${model}&name=${name}`,null)
  }

  addItemCategory(model: string, name:any){
    return this.http.post(this.baseAddressItem + `AddRankOrCategoryOrServer?model=${model}&name=${name}`,null)
  }

  getAllServers(){
    return this.http.get(this.baseAddressAccount + `GetAllServers`)
  }

  getAllRanks(){
    return this.http.get(this.baseAddressAccount + `GetAllRanks`)
  }

  getAllAccCategories(){
    return this.http.get(this.baseAddressAccount + `GetAllAccCategoris`)
  }

  getAllItemCategories(){
    return this.http.get(this.baseAddressItem + `GetAllItemCategory`)
  }

  // --------------------------------------------
  // Save Admin Action                          |
  // --------------------------------------------
  saveAdminAction(obj: {action: any, adminId: any}){
    return this.http.post('https://localhost:7255/api/Owner/SaveActions',obj)
  }
}
