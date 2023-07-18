import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-viewabout',
  templateUrl: './viewabout.component.html',
  styleUrls: ['./viewabout.component.scss']
})
export class ViewaboutComponent implements OnInit {
  signin = false;

  constructor(private authservice:AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem("token") != null){
      this.signin = true;
    }
  }

}
