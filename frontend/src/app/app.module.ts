import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LoginService } from './providers/login.service';
import { UsersService } from './providers/users.service';
import { HttpService } from './providers/http-service.service';
import { CookieModule } from 'ngx-cookie';
import {GrowlModule} from 'primeng/primeng';

import { DatePipe } from "@angular/common";
import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { LoadingModule } from 'ngx-loading';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ResetConfirmationComponent } from './reset-confirmation/reset-confirmation.component';
//import { ViewCompanyUsersComponent } from './layout/view-company-users/view-company-users.component';
// AoT requires an exported function for factories
// import { ViewlogComponent } from './layout/viewlog/viewlog.component';
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent,ForgotPasswordComponent, ResetPasswordComponent, ResetConfirmationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule, FormsModule,
        HttpModule,
        AppRoutingModule,
        LoadingModule,
        CookieModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        }),
        GrowlModule
    ],
    //     providers: [
    //     LoginService,
    //   { provide: BrowserXhr, useClass: NgProgressBrowserXhr }
    //   // AuthService
    // ],
    providers: [AuthGuard, LoginService, UsersService, DatePipe,{
        provide: HttpService,
        useFactory: httpServiceFactory,
        deps: [XHRBackend, RequestOptions]
    },],
    bootstrap: [AppComponent]
})
export class AppModule {
}

//This is for http interceptor
export function httpServiceFactory(backend: XHRBackend, options: RequestOptions) {
    return new HttpService(backend, options);
}
