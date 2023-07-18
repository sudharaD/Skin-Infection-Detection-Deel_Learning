import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutusRoutingModule } from './aboutus-routing.module';
import { ViewaboutComponent } from './viewabout/viewabout.component';
import { NavbarModule} from '../navbar/navbar.module';


@NgModule({
  declarations: [ViewaboutComponent],
  imports: [
    CommonModule,
    AboutusRoutingModule,
    NavbarModule
  ]
})
export class AboutusModule { }
