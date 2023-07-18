import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavsComponent } from './navs/navs.component';
import { HorizontalComponent } from './horizontal/horizontal.component';


@NgModule({
  declarations: [NavsComponent, HorizontalComponent],
  imports: [
    CommonModule,
    NavbarRoutingModule
  ],
  exports:[
    NavsComponent,
    HorizontalComponent
  ]
})
export class NavbarModule { }
