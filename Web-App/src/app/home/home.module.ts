import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { ViewhomeComponent } from './viewhome/viewhome.component';
import { NavbarModule} from '../navbar/navbar.module';


@NgModule({
  declarations: [ViewhomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NavbarModule
  ] 
})
export class HomeModule { }
