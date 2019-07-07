import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userName: string;
  
  constructor(private authsvc: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.authsvc.loggedUser.subscribe(
      res => {
        this.userName = this.authsvc.loggedUser.value;
        console.log(this.userName)
      },
      err => console.log(err)
    ) 
  }
}
