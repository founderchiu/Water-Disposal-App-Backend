import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent, SidebarComponent } from '../shared';
import { AddCompanyAdminComponent } from './add-company-admin/add-company-admin.component';
import { AddHaulerAdminComponent } from './add-hauler-admin/add-hauler-admin.component';
import { AddCompanyUserComponent } from './add-company-user/add-company-user.component';
import { AddHaulerUserComponent } from './add-hauler-user/add-hauler-user.component';
import { AddPadsComponent } from './add-pads/add-pads.component';
import { AddTanksComponent } from './add-tanks/add-tanks.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { DataTableModule, SharedModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, GrowlModule, OverlayPanelModule } from 'primeng/primeng';
import { DatePipe } from "@angular/common";
import { LoadingModule } from 'ngx-loading';
import { ViewCompanyUsersComponent } from './view-company-users/view-company-users.component';
import { ViewHaulerAdminsComponent } from './view-hauler-admins/view-hauler-admins.component';
import { ViewHaulerUserComponent } from './view-hauler-user/view-hauler-user.component';
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import { PhoneNoPipe } from '../shared/pipes/phone-no.pipe';
import { ViewPadsComponent } from './view-pads/view-pads.component';
import { AddWellsComponent } from './add-wells/add-wells.component';
import { ViewWellsComponent } from './view-wells/view-wells.component';
import { ImageUploadModule } from "angular2-image-upload";
import {LightboxModule} from 'primeng/primeng';
//import { ImageUploadModule } from 'ng2-imageupload';
import { ViewWellComponent } from './view-well/view-well.component';
import {DialogModule} from 'primeng/primeng';

import { GisComponent } from './gis/gis.component';
//import { GisComponent } from './gis.component';
//import { AgmCoreModule } from '@agm/core';
// import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { TransactionsComponent } from './transactions/transactions.component';
import { NguiMapModule} from '@ngui/map';
import {GMapModule} from 'primeng/primeng';
import {PaginatorModule} from 'primeng/primeng';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { ViewImageComponent } from './view-image/view-image.component';
import {CarouselModule} from 'primeng/primeng';
import { ViewlogComponent } from './viewlog/viewlog.component';
// import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';


@NgModule({
    imports: [
        CommonModule,
        NgbDropdownModule.forRoot(),
        LayoutRoutingModule,
        TranslateModule,
        ReactiveFormsModule, FormsModule,
        DataTableModule, SharedModule, ButtonModule, TooltipModule, ConfirmDialogModule, GrowlModule, OverlayPanelModule,DialogModule,
        LoadingModule,
        NgxPhoneMaskModule,
        GMapModule,
        PaginatorModule,LightboxModule,CarouselModule,
        ImageUploadModule.forRoot(),
        // AgmCoreModule.forRoot({
        //     apiKey: 'AIzaSyDaRY14n8VMUdDaVFGgz7sui9jgKOWYcLo'
        // }),
        NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDaRY14n8VMUdDaVFGgz7sui9jgKOWYcLo'})
        // AgmSnazzyInfoWindowModule
    ],
    declarations: [
        LayoutComponent,
        HeaderComponent,
        SidebarComponent,
        AddCompanyAdminComponent,
        AddHaulerAdminComponent,
        AddCompanyUserComponent,
        AddHaulerUserComponent,
        AddPadsComponent,
        AddTanksComponent,
        ViewCompanyComponent,
        ViewCompanyUsersComponent,
        ViewHaulerAdminsComponent,
        ViewHaulerUserComponent,
        PhoneNoPipe,
        ViewPadsComponent,
        AddWellsComponent,
        ViewWellsComponent,
        ViewWellComponent,
        GisComponent,
        TransactionsComponent,
        ViewTransactionsComponent,
        ViewImageComponent,
        ViewlogComponent
        // ViewTransactionsComponent
    ],
    providers: [DatePipe, ConfirmationService]
})
export class LayoutModule { }
