


import { Component, OnInit, Output, Input } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { SharedService } from '../Services/shared.service';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})


export class ItemsComponent  implements OnInit{
  gameId: any = 1
  items: any[] = []
  @Output() itemId: any
  @Input() editFlag:any = false

  constructor(private admin:AdminService, public shared: SharedService){}
  ngOnInit(): void {
    this.shared.getItems(this.gameId)
  }

  deleteItem(id:any, index: any){
    this.admin.deleteItem(id).subscribe({
      next: (response: any) => {
        console.log(response)
        this.removeItem(index)
      },
      error: (err: any) => {
        if(err.status == 200){
          this.removeItem(index)
          console.log('item deleted successfully')
        }else{
          console.log(err)
        }
      }
    })
  }

  editItem(id: any){
    this.itemId = id
    this.shared.editItem = true
    this.items = []
  }

  removeItem(index: any){
    this.shared.items = this.shared.items.filter((item, i) => index != i)
  }
}


