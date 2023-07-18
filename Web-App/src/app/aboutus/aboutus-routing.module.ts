import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewaboutComponent } from './viewabout/viewabout.component';


const routes: Routes = [{
  path:'',component:ViewaboutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutusRoutingModule { }
