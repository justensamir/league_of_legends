import { Component, Input } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-server',
  templateUrl: './add-server.component.html',
  styleUrls: ['./add-server.component.css']
})


export class AddServerComponent {

  IsDisable: boolean = false;

  server = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get serverName() {
    return this.server.controls.name;
  }

  constructor(private admin: AdminService) {}

  addServer() {
    this.IsDisable = true;

    if (this.server.valid) {
      this.admin
        .addServerOrRank('Server', this.serverName.value)
        .subscribe({
          next: (respons: any) => {
            this.IsDisable = false;
            console.log('Server Added Successfully');
          },
          error: (err: any) => {
            this.IsDisable = false;
            if (err.status == 200) {
              console.log('Server Added Successfully');
            } else {
              console.log(err);
            }
          },
        });
    } else {
      this.IsDisable = false;
    }
  }

}
