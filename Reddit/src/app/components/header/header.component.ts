import { Component, OnInit, ViewChild, ContentChild } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { DropdownComponent } from "../dropdown/dropdown.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  @ViewChild("channelSelector", { static: false })
  channelSelector: DropdownComponent;
  @ViewChild("newPostSelector", { static: false })
  newPostSelector: DropdownComponent;

  userName: string;
  channel: string;

  constructor(private authsvc: AuthService, private router: Router) {}

  ngOnInit() {
    this.authsvc.loggedUser.subscribe(
      res => {
        this.userName = this.authsvc.loggedUser.value;
      },
      err => console.log(err)
    );
  }

  logOut() {
    this.authsvc.logout().subscribe();
  }

  isLoggedIn() {
    return this.authsvc.isLoggedIn();
  }

  selectedChannel() {
    this.channelSelector.selectedChannel();
    this.channelSelector.selectionChange.emit()
  }

  selectedFreshPosts() {
    this.newPostSelector.selectedFreshPosts();
    this.newPostSelector.selectionChange.emit()
  }
}
