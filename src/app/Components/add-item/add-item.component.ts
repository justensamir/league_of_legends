
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from './../Services/admin.service';
import { Component, Input, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})

export class AddItemComponent implements OnInit{
  @Input() itemId:any
  @Output() editFlag: boolean = true
  games: {id:any, name: string}[] = [{id:1, name: 'LEGUE OF LEGENDS'}]
  servers: any
  categories: any
  ranks: any
  IsDisable: boolean = false

  item = new FormGroup(
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

  get itemName(){
    return this.item.controls.name
  }
  get itemPrice(){
    return this.item.controls.price
  }
  get itemGame(){
    return this.item.controls.game_Id
  }
  get itemServer(){
    return this.item.controls.server_Id
  }
  get itemCategory(){
    return this.item.controls.category_Id
  }
  get itemRank(){
    return this.item.controls.rank_Id
  }
  get itemImageUrl(){
    return this.item.controls.imgUrl
  }
  get itemDescription(){
    return this.item.controls.description
  }

  constructor(private admin:AdminService, private shared: SharedService){}
  ngOnInit(): void {
    console.log("item ID " + this.itemId)
    this.admin.getAllServers().subscribe({
      next: (response: any) => {
        this.servers = response
      }
    })

    this.admin.getAllItemCategories().subscribe({
      next: (response: any) => {
        this.categories = response
      }
    })

    this.admin.getAllRanks().subscribe({
      next: (response: any) => {
        this.ranks = response
      }
    })

    if(this.itemId != 0){
      this.admin.getItemById(this.itemId).subscribe({
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
          this.item.setValue(obj)
          console.log(this.item.value)
        }
      })
    }
  }


  manageItem(){
    if(this.itemId == 0){
      this.addNewItem()
    }else{
      this.editItem()
    }
  }


  addNewItem(){
    this.IsDisable = true
    if(this.item.valid){
      this.admin.addItem(this.item.value).subscribe({
        next: (response:any) => {
          console.log('item Added')
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


  editItem(){
    this.IsDisable = true

    if(this.item.valid){
      this.admin.editItem(this.itemId,this.item.value).subscribe({
        next: (response:any) => {
          console.log('item updated successfully')
          this.IsDisable = false
          this.shared.editItem = false
          this.shared.getItems(this.games[0].id)
        },
        error: (err: HttpErrorResponse) => {
          this.IsDisable = false
          if(err.status == 200){
            this.editFlag = false
            console.log('item updated successfully')
            this.shared.editItem = false
            this.shared.getItems(this.games[0].id)
          }
          console.log(err)
        }
      })
    }else{
      this.IsDisable = false
    }
  }
}
