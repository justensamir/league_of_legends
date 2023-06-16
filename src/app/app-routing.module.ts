import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { VerificationFormComponent } from './Components/verification-form/verification-form.component';

const routes: Routes = [
  {path:"signin",component:LoginComponent},
  {path:"signup",component:RegisterComponent},
  {path:"verify",component:VerificationFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
