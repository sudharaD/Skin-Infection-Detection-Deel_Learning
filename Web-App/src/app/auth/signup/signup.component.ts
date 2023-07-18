import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Matchpassword} from '../validaotrs/matchpassword';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  shownext = false;
  likereg = false;
  likedermo = "no"
  agreed = false;
  msg :string;

  like(){  
    this.likereg = !this.likereg;
    console.log(this.likereg)

  }
  
  doctorForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
    ]),
    specialization: new FormControl('', [
      Validators.required,
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
    country: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^.+@.+\\..+$")
    ]),
    password: new FormControl('', [
      Validators.required,
    ]),
    regnum: new FormControl('', [
      Validators.required,
    ]),
    hospital: new FormControl('', [
      Validators.required,
    ]),
    like: new FormControl(this.likereg , [
    ]),
    region: new FormControl('', [
    ]),
    agree : new FormControl(this.agreed,[
      Validators.required
    ]),
    confirmpassword : new FormControl('',[
      Validators.required
    ])  
  },{validators:[this.matchpasword.validate]});

  isdoctor:boolean;

  constructor(private authservice: AuthService , private router:Router , private matchpasword:Matchpassword) { }


  ngOnInit(): void {
    this.isdoctor = this.authservice.isdoctor;
  } 


  onclick(){
    this.shownext = true;
  }

  clickback(){
    this.shownext = false; 
  }

  agree(){
    this.agreed = !this.agreed;
  }



  onsubmitdoc(){
    if(this.agreed == true){
      this.authservice.docregister(this.doctorForm.value).subscribe({
        next : (res) =>{
          if(res.allow == true ){
            this.authservice.savestatus("token" , res.token);
            this.authservice.saveemail("email" , res.email);
            this.authservice.saveuifor("uifor" , res.uifor);
            this.authservice.savename("name" , res.name);
            this.authservice.saveurl("url" , res.picpath);
            this.authservice.savehospital("hospital" , res.hospital);
            this.authservice.saveregion("region" , res.region);
            this.authservice.signedin$.next(true);
            this.router.navigateByUrl('/home');
          }else{
            this.msg = res.msg;
          }  
        }
      });
  }else{
    this.msg = "Please accept terms and conditions "
  }
  }
}
