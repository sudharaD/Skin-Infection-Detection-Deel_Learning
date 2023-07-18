import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  msg:string;

  authForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^.+@.+\\..+$")
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  });

  constructor(private authservice:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onsubmit(){
    this.authservice.login(this.authForm.value).subscribe({
      next : (res) =>{
        if(res.allow == true ){
          this.authservice.saveemail("email" , res.email);
          this.authservice.savestatus("token" , res.token);
          this.authservice.saveuifor("uifor"  , res.uifor);
          this.authservice.savename("name" , res.name);
          this.authservice.saveurl("url" , res.picpath);
          this.authservice.savehospital("hospital" , res.hospital);
          this.authservice.saveregion("region" , res.region);
          this.authservice.signedin$.next(true);
          this.router.navigateByUrl('/home');
          console.log(res);
        }else{
          this.msg = res.msg;
        }  
      }
    }); 
  }


  forgetpw(){
    this.router.navigateByUrl('/getverify');
  }

}
