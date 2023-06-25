import { Component } from '@angular/core';
import { SharedService } from '../SharedService/shared.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(public shared: SharedService) {}

}
