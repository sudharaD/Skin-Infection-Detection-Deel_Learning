import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgetpwComponent } from './forgetpw/forgetpw.component';
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { SignupstuComponent } from './signupstu/signupstu.component';
import { VerifycodeComponent } from './verifycode/verifycode.component';



const routes: Routes = [
  {path:'' , component:HomeComponent,
    children:[
      {path:'signupdoctor' , component:SignupComponent},
      {path:'signin' , component:SigninComponent},
      {path:'passwordreset' , component:ForgetpwComponent},
      {path:'getverify' , component:VerifycodeComponent},
      {path:'signupstudent' , component:SignupstuComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
