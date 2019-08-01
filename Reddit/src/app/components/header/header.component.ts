import { Component, OnInit, ViewChild  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userName: string;
  channel: string;

  constructor(private authsvc: AuthService, private router: Router) { }

  ngOnInit() {
    this.authsvc.loggedUser.subscribe(
      res => {
        this.userName = this.authsvc.loggedUser.value;
      },
      err => console.log(err)
    )
  }

  logOut() {
    window.location.reload();
    this.authsvc.logout().subscribe();
  }

  isLoggedIn() {
    return this.authsvc.isLoggedIn();
  }

  outputEntity($event: any) {
    this.channel = $event;
    this.router.navigate([`/${this.channel}`]);
  }

  selectedChannel($event: string) {
    this.channel = $event;
    this.router.navigate([`/${this.channel}`]);
  }

}