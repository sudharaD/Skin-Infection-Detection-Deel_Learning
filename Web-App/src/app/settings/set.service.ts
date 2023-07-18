import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface todoc{
  email:string;
  regnum:string;
  hospital:string;
  specialization:string;
}

interface todocres{
  done:boolean;
  hospital:string;
}

interface todermo{
  email:string;
  region:string;
  hospital:string;
}

interface todermores{
  done:boolean;
  hospital:string;
  region:string;
}



@Injectable({
  providedIn: 'root'
})
export class SetService {

  constructor(private http:HttpClient) { }

  todoctor(credentials:todoc){
    return this.http.post<todocres>('http://localhost:5000/changepossition',credentials)
  }


  todermo(credentials:todermo){
    return this.http.post<todermores>('http://localhost:5000/changetodermatology',credentials)
  }
}
  