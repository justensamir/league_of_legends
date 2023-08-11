import { Component, Input } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  @Input() IsAccountCategory: any;
  IsDisable: boolean = false;

  category = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  get categoryName() {
    return this.category.controls.name;
  }

  constructor(private admin: AdminService) {}

  addCategory() {
    this.IsAccountCategory ? this.addAccountCategory() : this.addItemCategory();
  }

  addAccountCategory() {
    this.IsDisable = true;

    if (this.category.valid) {
      this.admin
        .addAccountCategory('Category', this.categoryName.value)
        .subscribe({
          next: (respons: any) => {
            this.IsDisable = false;
            console.log('Account Category Added Successfully');
          },
          error: (err: any) => {
            this.IsDisable = false;
            if (err.status == 200) {
              console.log('Account Category Added Successfully');
            } else {
              console.log(err);
            }
          },
        });
    } else {
      this.IsDisable = false;
    }
  }

  addItemCategory() {
    this.IsDisable = true;

    if (this.category.valid) {
      this.admin
        .addItemCategory('Category', this.categoryName.value)
        .subscribe({
          next: (respons: any) => {
            this.IsDisable = false;
            console.log('Item Category Added Successfully');
          },
          error: (err: any) => {
            this.IsDisable = false;
            if (err.status == 200) {
              console.log('Account Category Added Successfully');
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
