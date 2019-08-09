import { Component, OnInit, ViewChild, Input } from "@angular/core";
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
  @ViewChild("dropDownChannel", { static: false })
  dropDownChannel: DropdownComponent;
  @ViewChild("dropDownNewPosts", { static: false })
  dropDownNewPosts: DropdownComponent;

  userName: string;
  channel: string;
  filter: string;

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
    this.dropDownChannel.selectionChange.subscribe(channel => {
      if (channel !== this.channel) {
        this.channel = channel;
        if (this.filter !== undefined){
          this.router.navigate([`/${this.channel}`], {
            queryParams: { filter: `${this.filter}` }
          });
        } else{
          this.router.navigate([`/${this.channel}`])
        }
      }
    });
  }

  reload() {
    this.channel = "";
    this.router.navigate([`/${this.channel}`]);
  }

  newPosts() {
    this.dropDownNewPosts.selectionChange.subscribe(selectedValue => {
      this.filter = selectedValue;
      if (this.filter) {
        if (!this.channel) {
          return this.router.navigate(["/"], {
            queryParams: { filter: `${this.filter}` }
          });
        } else {
          return this.router.navigate([`/${this.channel}/`], {
            queryParams: { filter: `${this.filter}` }
          });
        }
      }
    });
  }
}
