import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneNoPipe } from './phone-no.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [PhoneNoPipe]
})
export class SharedPipesModule { }
