import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { DataTableModule, SharedModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, GrowlModule, OverlayPanelModule } from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';

@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule, FormsModule, DataTableModule, SharedModule, ButtonModule, TooltipModule, ConfirmDialogModule, GrowlModule,OverlayPanelModule,DialogModule,
    ],
    declarations: [LoginComponent, AdminLoginComponent]
})
export class LoginModule {
}
