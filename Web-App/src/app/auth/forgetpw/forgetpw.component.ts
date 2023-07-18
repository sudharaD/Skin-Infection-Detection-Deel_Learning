import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgetpw',
  templateUrl: './forgetpw.component.html',
  styleUrls: ['./forgetpw.component.scss']
})
export class ForgetpwComponent implements OnInit {
  forgetForm = new FormGroup({
    verifycode: new FormControl('', [
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    email : new FormControl(localStorage.getItem("email"))
  });

  constructor(private authservice:AuthService , private router:Router) { }

  ngOnInit(): void {  
  }


  onsubmit(){
    console.log(this.forgetForm.value);
    this.authservice.verifycode(this.forgetForm.value).subscribe((res) =>{
      console.log(this.forgetForm.value);
    })
  }

}
  