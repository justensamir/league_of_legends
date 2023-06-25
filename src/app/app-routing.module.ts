import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { VerificationFormComponent } from './Components/verification-form/verification-form.component';
import { HomeComponent } from './Components/home/home.component';
import { ForgetComponent } from './Components/forget/forget.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AddAdminComponent } from './Components/add-admin/add-admin.component';
import { PermissionsComponent } from './Components/permissions/permissions.component';
import { ActionsComponent } from './Components/actions/actions.component';
import { ProfileComponent } from './Components/profile/profile.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"signin",component:LoginComponent},
  {path:"signup",component:RegisterComponent},
  {path:"verify",component:VerificationFormComponent},
  {path:"forget", component:ForgetComponent},
  {path: 'AdminDashboard', component:AdminDashboardComponent},
  {path: 'admins/add', component:AddAdminComponent},
  {path: 'admins/permissions', component:PermissionsComponent},
  {path: 'admin/actions', component:ActionsComponent},
  {path: 'profile', component:ProfileComponent},
  {path:"**", component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
