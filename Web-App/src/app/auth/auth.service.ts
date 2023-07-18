import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import { tap } from 'rxjs/operators';

interface logindetails{
  email:string;
  password:string;
}

interface studentresponce{
  allow:boolean;
  token:string;
  email:string;
  uifor:string;
  msg:string;
  name:string;
  picpath:string
}

interface docresponce{
  allow:boolean;
  token:string;
  email:string;
  uifor:string;
  msg:string;
  name:string;
  picpath:string;
  hospital:string;
  region:string;
}

interface loginresponce{
  allow:boolean;
  token:string;
  email:string;
  uifor:string;
  msg:string;
  name:string;
  picpath:string;
  hospital:string;
  region:string;
}

interface studentreg{
  name:string,
  university:string,  
  gender:string,
  country:string,
  email:string,
  password:string
}

interface logoutresponce{
  allow:boolean
}


interface search{
  region:string
}

interface sendemail{
  email:string;
}

interface verifycode{
  verifycode:string;
  passeord:string;
  email:string
}

interface sendemailresponce{
  email:string;
}

interface docreg{
  name:string;
  specialization:string;
  gender:string;
  country:string;
  email:string;
  password:string;
  regnum:string;
  hospital:string;
  like:boolean;
  region:string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isdoctor = false;
  signedin$ = new BehaviorSubject(false);
  token:string;


  constructor(private http:HttpClient) { }

  login(credentials:logindetails){
    return this.http.post<loginresponce>('http://localhost:5000/login', credentials).pipe(
      tap(() =>{
        this.signedin$.next(true);
      })
    )
  }

  studentregister(credentials:studentreg){
    return this.http.post<studentresponce>('http://localhost:5000/sregister', credentials).pipe(
      tap(()=>{
          this.signedin$.next(true);
      })
    );
  }

  docregister(credentials:docreg){
    return this.http.post<docresponce>('http://localhost:5000/dregister', credentials).pipe(
      tap(()=>{
          this.signedin$.next(true);
      })
    );
  }
  
  
  savestatus(name:string , token:string){
    localStorage.setItem(name,token);
  }

  logout(){
    return this.http.get<logoutresponce>('http://localhost:5000/logout').pipe(
      tap(() =>{
        this.signedin$.next(false);
      })
    );
  }

  sendemail(credentials:sendemail){
    return this.http.post<sendemailresponce>('http://localhost:5000/forgotpassword',credentials)
  }


  verifycode(credentials:verifycode){
    return this.http.post('http://localhost:5000/verifycode',credentials)
  }


  saveemail(name:string , email:string){
    localStorage.setItem(name , email)
  }

  saveuifor(name:string , uifor:string){
    localStorage.setItem(name , uifor)
  }

  savename(name:string , Name:string){
    localStorage.setItem(name ,Name)
  }

  saveurl(name:string , url:string){
    localStorage.setItem(name , url)
  }

  savehospital(name:string , hospital:string){
    localStorage.setItem(name , hospital)
  }

  saveregion(name:string , region:string){
    localStorage.setItem(name , region)
  }

}
