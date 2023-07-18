import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-viewinfection',
  templateUrl: './viewinfection.component.html',
  styleUrls: ['./viewinfection.component.scss']
})
export class ViewinfectionComponent implements OnInit {
  selectedfile: File=null;
  disease;
  url= "./assets/cd.png";

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }



  onfileselected(event){
    const file = event.target.files[0];
    this.selectedfile = file;

    if(event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload=(event:any)=>{
        this.url=event.target.result;
      }
    }
  }

  onupload(){
    const fd = new FormData();
    fd.append('file',this.selectedfile);
    this.http.post('http://localhost:8081/api/predict',fd).subscribe(res =>{
      console.log(res);
      this.disease = res;
    });
  }

}
