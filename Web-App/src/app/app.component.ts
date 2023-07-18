import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private authservice:AuthService){}

  ngOnInit(): void {
    if(localStorage.getItem("token") != null){
      this.authservice.signedin$.next(true);
    }else{
      this.authservice.signedin$.next(false);
    }
  }
}
