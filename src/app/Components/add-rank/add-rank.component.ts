
import { Component, Input } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from '../Services/shared.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-add-rank',
  templateUrl: './add-rank.component.html',
  styleUrls: ['./add-rank.component.css']
})

export class AddRankComponent {

  IsDisable: boolean = false;


  rank = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get rankName() {
    return this.rank.controls.name;
  }

  constructor(private admin: AdminService, private shared:SharedService) {}

  addRank() {
    this.IsDisable = true;

    if (this.rank.valid) {
      this.admin
        .addServerOrRank('Rank', this.rankName.value)
        .subscribe({
          next: (respons: any) => {
            this.IsDisable = false;
            const observable = this.admin.saveAdminAction({action:`AddRank_${this.rankName.value}`,adminId:this.shared.user.id})
            console.log(observable)
            forkJoin(observable).subscribe({
              next: (response: any) => {
                console.log('Action Added Successfully');
              },
              error: (err: any) => {
                console.log('Action', err)
              }
            })
            console.log('Rank Added Successfully');
          },
          error: (err: any) => {
            this.IsDisable = false;
            if (err.status == 200) {
              console.log('Rank Added Successfully');
            } else {
              console.log('Rank',err);
            }
          },
        });
    } else {
      this.IsDisable = false;
    }
  }

}
