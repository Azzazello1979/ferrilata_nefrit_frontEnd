import {
  Component,
  OnInit,
  ViewChild} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { DropdownComponent } from "../dropdown/dropdown.component";
import { JwtHelperService } from "@auth0/angular-jwt";

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
    const helper = new JwtHelperService();
    const myJwtToken = this.authsvc.getJwtToken();
    const decodedToken = helper.decodeToken(myJwtToken);
    this.userName = decodedToken.username;
  }

  logOut() {
    window.location.reload();
    this.authsvc.logout().subscribe();
  }

  isLoggedIn() {
    return this.authsvc.isLoggedIn();
  }

  selectedChannel() {
    this.channelSelector.selectedChannel();
    this.channelSelector.selectionChange.subscribe(selectedChannel => {
      this.router.navigate([`/${selectedChannel}`]);
    });
  }

  selectedFreshPosts() {
    this.newPostSelector.selectedFreshPosts();
  }
}
