import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './signin/signin.component';
import { SignoutComponent } from './signout/signout.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { VerifycodeComponent } from './verifycode/verifycode.component';
import { SignupstuComponent } from './signupstu/signupstu.component';


@NgModule({
  declarations: [SigninComponent, SignoutComponent, SignupComponent, HomeComponent, ForgetpwComponent, VerifycodeComponent, SignupstuComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class AuthModule { }
