import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {

  @Input() product: any
  @Input() type: any

  constructor(private shared:SharedService){}
  addToCart(){
    console.log({key:this.type,value:this.product?.id})
    this.shared.cartProducts.push({key:this.type,value:this.product?.id})
  }

}
