import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewinfectionComponent } from './viewinfection/viewinfection.component';


const routes: Routes = [{
  path:'',component:ViewinfectionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InfectionRoutingModule { }
