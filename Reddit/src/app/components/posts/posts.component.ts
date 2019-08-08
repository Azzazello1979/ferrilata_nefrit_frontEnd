import { Component, OnInit } from '@angular/core';
import { Posts } from '../../posts.model';
import { PostServiceService } from '../../services/post-service.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Button } from 'protractor';
import { ActivatedRoute, Params } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
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
  ) { }

  ngOnInit() {
    this.postservice.getPosts().subscribe((postData: Posts[]) => {
      this.posts = postData;
    });
    this.isLoggedIn = this.authservice.isLoggedIn();

    this.route.params.subscribe((selectedChannel: Params) => {
      if (Object.keys(selectedChannel).length === 0) {
      this.postservice.getPosts().subscribe((postData: Posts[]) => {
        this.posts = postData;
      });
    } else {
      this.postservice
        .filterPosts(selectedChannel)
        .subscribe((postData: Posts[]) => {
          this.posts = postData;
        });
      }
    });

    this.route.queryParams.subscribe((query: Params) => {
      console.log('sdds', query.filter)
      if (Object.keys(query).length !== 0) {
      this.postservice.newPosts(query).subscribe((postData: Posts[]) => {
        this.posts = this.posts.filter(post => post.timestamp).sort();
        this.posts = postData;      });
    } else {
      this.postservice
        .filterPosts(query)
        .subscribe((postData: Posts[]) => {
          this.posts = this.posts.filter(post => post.timestamp).sort();
          this.posts = postData;
        });
      }
    });
      }

  openDialog(postId): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this post?',
        buttonLeft: 'Yes',
        buttonRight: 'Cancel',
        postId,
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.refreshPosts();
    });
    this.postservice.getPosts();
  }

  refreshPosts() {
    this.postservice.getPosts().subscribe((result) => {
      this.posts = result as Posts[];
    });
  }

  newestPosts() {
    this.postservice.getPosts().subscribe((result) => {
      this.posts.sort(post => post.timestamp);
      this.posts = result as Posts[];
    });
  }

  jwtDecode() {
    const helper = new JwtHelperService();
    const myJwtToken = this.authservice.getJwtToken();
    const decodedToken = helper.decodeToken(myJwtToken);
    this.decodedUsername = decodedToken.username;
    return this.decodedUsername;
  }
}
