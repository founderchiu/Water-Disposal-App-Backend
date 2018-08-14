import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { EditComponent } from './edit/edit.component';
import { UserRoutingModule } from './user.routing.module';


@NgModule({
  imports: [
    CommonModule,UserRoutingModule
  ],
  declarations: [UserComponent,EditComponent]
})
export class UserModule { }
