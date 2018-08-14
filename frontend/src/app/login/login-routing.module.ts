import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
//import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
    { path: '', component: LoginComponent },
   // { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'admin-login', component: AdminLoginComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
