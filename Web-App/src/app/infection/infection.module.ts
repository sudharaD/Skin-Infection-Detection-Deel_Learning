import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfectionRoutingModule } from './infection-routing.module';
import { ViewinfectionComponent } from './viewinfection/viewinfection.component';
import { NavbarModule} from '../navbar/navbar.module';


@NgModule({
  declarations: [ViewinfectionComponent],
  imports: [
    CommonModule,
    InfectionRoutingModule,
    NavbarModule
  ]
})
export class InfectionModule { }
