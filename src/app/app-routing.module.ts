import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { VerificationFormComponent } from './Components/verification-form/verification-form.component';
import { HomeComponent } from './Components/home/home.component';
import { ForgetComponent } from './Components/forget/forget.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"signin",component:LoginComponent},
  {path:"signup",component:RegisterComponent},
  {path:"verify",component:VerificationFormComponent},
  {path:"forget", component:ForgetComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
