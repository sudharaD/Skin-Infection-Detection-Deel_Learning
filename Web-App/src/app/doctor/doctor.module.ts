import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { ViewdoctorComponent } from './viewdoctor/viewdoctor.component';
import { NavbarModule} from '../navbar/navbar.module';


@NgModule({
  declarations: [ViewdoctorComponent],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    NavbarModule
  ]
})
export class DoctorModule { }
