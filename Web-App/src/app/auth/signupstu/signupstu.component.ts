import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Matchpassword} from '../validaotrs/matchpassword';

@Component({
  selector: 'app-signupstu',
  templateUrl: './signupstu.component.html',
  styleUrls: ['./signupstu.component.scss']
})
export class SignupstuComponent implements OnInit {
  msg : string; 
  agreed = false;

  studentForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^.+@.+\\..+$")
    ]),
    university: new FormControl('', [
      Validators.required,
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
    country: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    confirmpassword:new FormControl('',[
      Validators.required,
    ]),
    agree:new FormControl(this.agreed,[
      Validators.required,
    ])
  },{validators:[this.matchpassword.validate]});

  constructor(private authservice :AuthService , private router:Router , private matchpassword:Matchpassword) { }

  ngOnInit(): void {
  }

  submitstudent(){
    if(this.agreed == true){
      this.authservice.studentregister(this.studentForm.value).subscribe({
        next : (res) =>{
          if(res.allow == true ){
            this.authservice.savestatus("token" , res.token);
            this.authservice.saveemail("email" , res.email);
            this.authservice.saveuifor("uifor" , res.uifor);
            this.authservice.savename("name" , res.name);
            this.authservice.saveurl("url" , res.picpath);
            this.authservice.signedin$.next(true);
            this.router.navigateByUrl('/home');
          }else{
            this.msg = res.msg;
          }   
        }
      });
  }else{
    this.msg = "please accept terms and conditions"
  }
}
  agree(){
    this.agreed = !this.agreed;
  }

}
