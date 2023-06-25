import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent {
  dashboard: {
    admins: boolean,
    addAdmin: boolean,
    actions: boolean,
    permissions: boolean,
    profile: boolean
  } = {
    admins: true,
    addAdmin: false,
    actions: false,
    permissions: false,
    profile: false
  }

  reset(){
    this.dashboard = {
      admins: false,
      addAdmin: false,
      actions: false,
      permissions: false,
      profile: false
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
}
