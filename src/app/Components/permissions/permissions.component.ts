import { OwnerServiceService } from './../Services/owner-service.service';
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { forkJoin, map } from 'rxjs';
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css'],
})
export class PermissionsComponent implements OnInit {
  load: boolean = true;
  admins: any[] = [];

  permissions: {
    Add_Item: boolean;
    Edit_Item: boolean;
    Delete_Item: boolean;
    Add_Account: boolean;
    Edit_Account: boolean;
    Delete_Account: boolean;
    Complains: boolean;
  }[] = [];

  constructor(private ownerService: OwnerServiceService) {}

  ngOnInit(): void {
    this.ownerService.getAllAdmins().subscribe({
      next: (response: any) => {
        this.load = false;
        this.admins = response;
        console.log(this.admins);
        console.log(this.load);

        const adminObservables = this.admins.map((admin) => {
          return this.ownerService.getAdminPermissions(admin.email);
        });

        forkJoin(adminObservables).subscribe((responses: any) => {
          responses.forEach((response: any, index: number) => {
            this.admins[index].permissions = response;
            console.log(this.admins[index]);
          });

          this.permissions = this.admins.map((admin) => {
            let obj = {
              Add_Item: false,
              Edit_Item: false,
              Delete_Item: false,
              Add_Account: false,
              Edit_Account: false,
              Delete_Account: false,
              Complains: false
            };

            admin.permissions.forEach((perm:any) => {
              switch(perm.permissionText){
                case 'Add_Item':
                  obj.Add_Item = true
                  break;
                case 'Edit_Item':
                  obj.Edit_Item = true
                  break;
                case 'Delete_Item':
                  obj.Delete_Item = true
                  break;
                case 'Add_Account':
                  obj.Add_Account = true
                  break;
                case 'Edit_Account':
                  obj.Edit_Account = true
                  break;
                case 'Delete_Account':
                  obj.Delete_Account = true
                  break;
                case 'Complains':
                  obj.Complains = true
                  break;
                default:
                  console.log('Not a Permission');
              }
            });

            return obj;
          });

          console.log(this.permissions);
        });
      },
    });
  }

  permission(event: Event, Email: string) {
    let input = event.target as HTMLInputElement;
    console.log(input.checked);
    if (input.checked) {
      this.addPermission({ email: Email, permission: input.value });
    } else {
      this.removePermission({ email: Email, permission: input.value });
    }
  }

  addPermission(obj: any) {
    console.log(obj);
    this.ownerService.AddPermission(obj).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: any) => {
        if (err.status == 200) {
          console.log('Permission Added');
        } else {
          console.log('Permission didnot added');
        }
      },
    });
  }

  removePermission(obj: any) {
    console.log(obj);
    this.ownerService.RemovePermission(obj).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: any) => {
        if (err.status == 200) {
          console.log('Permission removed');
        } else {
          console.log('Permission didnot removed');
        }
      },
    });
  }

  getAdminPermissions(email: string) {
    this.ownerService.getAdminPermissions(email).subscribe({
      next: (response: any) => {
        console.log(response);
      },
    });
  }
}
