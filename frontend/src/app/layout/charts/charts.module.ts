import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { PageHeaderModule } from '../../shared';
import {MultiSelectModule} from 'primeng/primeng';
import { LoadingModule } from 'ngx-loading';
import { DataTableModule, SharedModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, GrowlModule, OverlayPanelModule } from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
@NgModule({
    imports: [
        CommonModule,LoadingModule,
        Ng2Charts,
        ChartsRoutingModule,DataTableModule, SharedModule, ButtonModule, TooltipModule, ConfirmDialogModule, GrowlModule, OverlayPanelModule,DialogModule,
        PageHeaderModule,FormsModule,
        MultiSelectModule
    ],
    declarations: [ChartsComponent]
})
export class ChartsModule { }
