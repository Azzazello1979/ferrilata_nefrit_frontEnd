import { Component, OnInit } from "@angular/core";
import { Posts } from "../../posts.model";
import { PostServiceService } from "../../services/post-service.service";
import { AuthService } from "src/app/services/auth.service";
import { MatDialog } from "@angular/material";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { ActivatedRoute } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { combineLatest } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.css"]
})
export class PostsComponent implements OnInit {
  id: number;
  title: string;
  content: string;
  channel: string;
  timestamp: number;
  userId: string;
  posts: Posts[] = [];
  isLoggedIn: boolean;
  postToDelete: any;
  decodedUsername: string;
  constructor(
    private postservice: PostServiceService,
    private authservice: AuthService,
    public dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
 /*    this.postservice.getPosts().subscribe((postData: Posts[]) => {
      this.posts = postData;
    }); */
    this.isLoggedIn = this.authservice.isLoggedIn();
    combineLatest(this.route.params, this.route.queryParams)
      .pipe(map(results => ({ params: results[0].channel, query: results[1] })))
      .subscribe(results => {
        if (results.params !== undefined || results.query.filter !== undefined) {

          this.postservice
            .filterPosts(results.params, results.query)
            .subscribe((postData: Posts[]) => {
              console.log(postData);
              
              if (results.query.filter == "New") {
                this.newestPostsOnTop(postData);
              } else {
                this.posts = postData;
                console.log(results.params, results.query)
              }
            });
        } else {
          this.postservice.getPosts().subscribe((postData: Posts[]) => {
            this.posts = postData;
          });
        }
      });
  }

  openDialog(postId): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: "Are you sure you want to delete this post?",
        buttonLeft: "Yes",
        buttonRight: "Cancel",
        postId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshPosts();
    });
    this.postservice.getPosts();
  }

  refreshPosts() {
    this.postservice.getPosts().subscribe(result => {
      this.posts = result as Posts[];
    });
  }

  newestPostsOnTop(postData: Posts[]) {
    let reversed: Posts[] = [];
    for (let i = postData.length-1; i >= 0; i--) {
      reversed.push(postData[i]);
    }
    this.posts = reversed;
  }

  jwtDecode() {
    const helper = new JwtHelperService();
    const myJwtToken = this.authservice.getJwtToken();
    const decodedToken = helper.decodeToken(myJwtToken);
    this.decodedUsername = decodedToken.username;
    return this.decodedUsername;
  }
}
