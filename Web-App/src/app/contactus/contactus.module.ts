import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactusRoutingModule } from './contactus-routing.module';
import { ViewcontactComponent } from './viewcontact/viewcontact.component';
import { NavbarModule} from '../navbar/navbar.module';


@NgModule({
  declarations: [ViewcontactComponent],
  imports: [
    CommonModule,
    ContactusRoutingModule,
    NavbarModule
  ]
})
export class ContactusModule { }
