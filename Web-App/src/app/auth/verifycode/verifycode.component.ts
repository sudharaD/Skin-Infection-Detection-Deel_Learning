import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verifycode',
  templateUrl: './verifycode.component.html',
  styleUrls: ['./verifycode.component.scss']
})
export class VerifycodeComponent implements OnInit {

  verifyForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
    ])
  });

  constructor(private router:Router , private authservice:AuthService) { }

  ngOnInit(): void {
  }

  onsubmit(){
    this.authservice.sendemail(this.verifyForm.value).subscribe((res)=>{
      this.authservice.saveemail("email" , res.email)
      console.log(res)
    })
    this.router.navigateByUrl('/passwordreset');
  }
  
}
