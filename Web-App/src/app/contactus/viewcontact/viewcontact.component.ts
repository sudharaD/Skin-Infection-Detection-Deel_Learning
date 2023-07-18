import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-viewcontact',
  templateUrl: './viewcontact.component.html',
  styleUrls: ['./viewcontact.component.scss']
})
export class ViewcontactComponent implements OnInit {
  signin = false;

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") != null){
      this.signin = true;
    }
  }

}
