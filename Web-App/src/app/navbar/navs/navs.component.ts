import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.scss']
})
export class NavsComponent implements OnInit {

  name = localStorage.getItem("name");

  constructor() { }

  ngOnInit(): void {
  }

}
