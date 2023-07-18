import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms'

import { SettingsRoutingModule } from './settings-routing.module';
import { SethomeComponent } from './sethome/sethome.component';
import { NavbarModule} from '../navbar/navbar.module';
import { DoctorComponent } from './doctor/doctor.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [SethomeComponent, DoctorComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NavbarModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class SettingsModule { }
