import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import { UserComponent } from './user.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {path: 'list', component: UserComponent},
  {path: 'edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
