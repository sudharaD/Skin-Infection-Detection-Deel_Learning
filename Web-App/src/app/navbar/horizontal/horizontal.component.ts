import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-horizontal',
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss']
})
export class HorizontalComponent implements OnInit {
  name = localStorage.getItem("name");
  pic = localStorage.getItem("url");

  constructor(private authservice:AuthService , private router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.authservice.logout().subscribe({
      next : (res) =>{
        if(res.allow == false ){
          localStorage.clear();
          this.authservice.signedin$.next(false);
          this.router.navigateByUrl('/');
        }  
      }
    }); 
  }



}
