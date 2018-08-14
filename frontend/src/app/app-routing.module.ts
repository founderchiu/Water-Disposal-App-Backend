import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetConfirmationComponent } from './reset-confirmation/reset-confirmation.component';
//import { ViewCompanyUsersComponent } from './layout/view-company-users/view-company-users.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: './layout/layout.module#LayoutModule',
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
    //{ path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#forgotpasswordModule'},
    { path: 'users', loadChildren: './pages/user/user.module#UserModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'reset-sucessfully', component: ResetConfirmationComponent },
   
   // { path: 'view-company-users', component: ViewCompanyUsersComponent },
    { path: '**', redirectTo: 'not-found' }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
