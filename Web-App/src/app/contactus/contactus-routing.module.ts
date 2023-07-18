import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewcontactComponent } from './viewcontact/viewcontact.component';


const routes: Routes = [{
  path:'',component:ViewcontactComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactusRoutingModule { }
