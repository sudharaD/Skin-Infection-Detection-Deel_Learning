import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SethomeComponent } from './sethome/sethome.component';


const routes: Routes = [
  {path:'' , component:SethomeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
