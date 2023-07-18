import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewhomeComponent } from './viewhome/viewhome.component';


const routes: Routes = [{
  path:'',component:ViewhomeComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
