import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sethome',
  templateUrl: './sethome.component.html',
  styleUrls: ['./sethome.component.scss']
})
export class SethomeComponent implements OnInit {
  name = localStorage.getItem("name");
  email = localStorage.getItem("email");
  position = localStorage.getItem("uifor");
  hospital = localStorage.getItem("hospital");
  region = localStorage.getItem("region");
  dermatologist = false;
  doctor = false;

  constructor() { }

  ngOnInit(): void {
    if(this.position === "dermatologist"){
        this.dermatologist = true;
    }else if(this.position === "doctor"){
        this.doctor = true;
    }
  }


 

}
