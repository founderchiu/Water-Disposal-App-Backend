import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatComponent } from './stat.component';
import { DataTableModule, SharedModule, ButtonModule, TooltipModule, ConfirmDialogModule, ConfirmationService, GrowlModule, OverlayPanelModule } from 'primeng/primeng';
import {DialogModule} from 'primeng/primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [FormsModule,
        CommonModule,DataTableModule, SharedModule, ButtonModule, TooltipModule, ConfirmDialogModule, GrowlModule, OverlayPanelModule,DialogModule,
    ],
    declarations: [StatComponent],
    exports: [StatComponent]
})
export class StatModule { }
