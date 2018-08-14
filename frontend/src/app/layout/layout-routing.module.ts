import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { AddCompanyAdminComponent } from './add-company-admin/add-company-admin.component';
import { AddHaulerAdminComponent } from './add-hauler-admin/add-hauler-admin.component';
import { AddCompanyUserComponent } from './add-company-user/add-company-user.component';
import { AddHaulerUserComponent } from './add-hauler-user/add-hauler-user.component';
import { AddPadsComponent } from './add-pads/add-pads.component';
import { AddTanksComponent } from './add-tanks/add-tanks.component';
import { ViewCompanyComponent } from './view-company/view-company.component';
import { ViewCompanyUsersComponent } from './view-company-users/view-company-users.component';
import { ViewHaulerAdminsComponent } from './view-hauler-admins/view-hauler-admins.component';
import { ViewHaulerUserComponent } from './view-hauler-user/view-hauler-user.component';
import { ViewWellsComponent } from './view-wells/view-wells.component';
import { AddWellsComponent } from './add-wells/add-wells.component';
import { ViewWellComponent } from './view-well/view-well.component';
import { ViewPadsComponent } from './view-pads/view-pads.component';
import { GisComponent } from './gis/gis.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { ViewImageComponent } from './view-image/view-image.component';
import { ViewlogComponent } from './viewlog/viewlog.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            { path: 'add-company-admin', component: AddCompanyAdminComponent },
            { path: 'add-hauler-admin', component: AddHaulerAdminComponent },
            { path: 'add-company-user', component: AddCompanyUserComponent },
            { path: 'add-hauler-user', component: AddHaulerUserComponent },
            { path: 'add-pads', component: AddPadsComponent },
            { path: 'view-pads', component: ViewPadsComponent },
            { path: 'add-tanks', component: AddTanksComponent },
            { path: 'add-wells', component: AddWellsComponent },
            { path: 'gis', component: GisComponent },
            { path: 'view-wells', component: ViewWellComponent },
            { path: 'view-company-admin', component: ViewCompanyComponent },
            { path: 'view-company-users', component: ViewCompanyUsersComponent },
            { path: 'view-hauler-admin', component: ViewHaulerAdminsComponent },
            { path: 'view-hauler-user', component: ViewHaulerUserComponent },
            { path: 'view-tanks', component: ViewWellsComponent },
            { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' },
            { path: 'view-transactions/:id', component: TransactionsComponent },
            { path: 'view-transactions-Details', component: ViewTransactionsComponent},
            { path: 'view-image/:id', component: ViewImageComponent },
            { path: 'viewlog', component: ViewlogComponent },
          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
