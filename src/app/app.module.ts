import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VerificationFormComponent } from './Components/verification-form/verification-form.component';
import { RegisterComponent } from './Components/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { ContactusComponent } from './Components/contactus/contactus.component';
import { ForgetComponent } from './Components/forget/forget.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AdminDashboardComponent } from './Components/admin-dashboard/admin-dashboard.component';
import { AdminsComponent } from './Components/admins/admins.component';
import { AddAdminComponent } from './Components/add-admin/add-admin.component';
import { ActionsComponent } from './Components/actions/actions.component';
import { PermissionsComponent } from './Components/permissions/permissions.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { LoaderComponent } from './Components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    VerificationFormComponent,
    RegisterComponent,
    HomeComponent,
    ContactusComponent,
    ForgetComponent,
    NotFoundComponent,
    AdminDashboardComponent,
    AdminsComponent,
    AddAdminComponent,
    ActionsComponent,
    PermissionsComponent,
    ProfileComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
