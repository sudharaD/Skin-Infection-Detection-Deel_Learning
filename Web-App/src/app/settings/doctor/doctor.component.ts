import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SetService } from '../set.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  position = localStorage.getItem("uifor");
  email = localStorage.getItem("email");
  doctor = false;
  student = false;

  doctForm = new FormGroup({
    email: new FormControl(this.email, [
    ]),
    regnum: new FormControl('', [
      Validators.required
    ]),
    hospital: new FormControl('', [
      Validators.required
    ]),
    specialization: new FormControl('', [
      Validators.required
    ]),
  });

  dermoForm = new FormGroup({
    region: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl(this.email, [
    ]),
    hospital: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private setservice:SetService) { }

  ngOnInit(): void {
    if(this.position === "doctor"){
      this.doctor = true;
    }else if(this.position === "student"){
      this.student = true;
    }
  }

  changeposition(){
    if(this.position === "student"){
      this.setservice.todoctor(this.doctForm.value).subscribe((res) =>{
        if(res.done == true){
          window.location.reload();
        }
      });
    }else if(this.position === "doctor"){
      this.setservice.todermo(this.dermoForm.value).subscribe((res) =>{
        if(res.done == true){
          window.location.reload();
        }
      });
    }  
  }

}
