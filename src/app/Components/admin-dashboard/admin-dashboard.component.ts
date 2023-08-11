import { Component } from '@angular/core';
import { SharedService } from '../Services/shared.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {

  constructor(public shared: SharedService){}

  accountId: any
  dashboard: {
    admins: boolean,
    addAdmin: boolean,
    actions: boolean,
    permissions: boolean,
    profile: boolean,
    accounts: boolean,
    addAccount: boolean,
    Items: boolean,
    addItem: boolean,
    addItemCategory: boolean,
    addAccountCategory: boolean,
    addServer: boolean,
    addRank: boolean,
  } = {
    admins: true,
    addAdmin: false,
    actions: false,
    permissions: false,
    profile: false,
    accounts: false,
    addAccount: false,
    Items: false,
    addItem: false,
    addItemCategory: false,
    addAccountCategory: false,
    addServer: false,
    addRank: false,
  }

  reset(){
    this.dashboard = {
      admins: false,
      addAdmin: false,
      actions: false,
      permissions: false,
      profile: false,
      accounts: false,
      addAccount: false,
      Items: false,
      addItem: false,
      addItemCategory: false,
      addAccountCategory: false,
      addServer: false,
      addRank: false,
    }
  }

  setAdmins(){
    this.reset()
    this.dashboard.admins = true
  }

  setAddAdmin(){
    this.reset()
    this.dashboard.addAdmin = true
  }

  setActions(){
    this.reset()
    this.dashboard.actions = true
  }

  setPermissions(){
    this.reset()
    this.dashboard.permissions = true
  }

  setProfile(){
    this.reset()
    this.dashboard.profile = true
  }

  setAccounts(){
    this.reset()
    this.dashboard.accounts = true
  }

  setAddAccount(){
    this.reset()
    this.accountId = 0
    this.dashboard.addAccount = true
  }

  setItems(){
    this.reset()
    this.dashboard.Items = true
  }

  setAddItem(){
    this.reset()
    this.dashboard.addItem = true
  }

  setAddItemCategory(){
    this.reset()
    this.dashboard.addItemCategory = true
  }
  setAddAccountCategory(){
    this.reset()
    this.dashboard.addAccountCategory = true
  }
  setAddServer(){
    this.reset()
    this.dashboard.addServer = true
  }
  setAddRank(){
    this.reset()
    this.dashboard.addRank = true
  }
}
