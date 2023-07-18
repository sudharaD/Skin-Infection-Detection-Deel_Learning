import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewdoctorComponent } from './viewdoctor/viewdoctor.component';


const routes: Routes = [{
  path:'',component:ViewdoctorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }
