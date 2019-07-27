import { Component, OnInit } from '@angular/core';
import { Posts } from '../../posts.model';
import { PostServiceService } from '../../services/post-service.service';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Button } from 'protractor';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
  // template: `<p>The hero's birthday is {{ timestamp | elapsedTime }}</p>`
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
  constructor(
    private postservice: PostServiceService,
    private authservice: AuthService,
    public dialog: MatDialog
    ) {}

    ngOnInit() {
      this.postservice.getPosts().subscribe((postData: Posts[]) => {
        this.posts = postData;
      });
      this.isLoggedIn = this.authservice.isLoggedIn();

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
      if (result) {
        console.log('Yes clicked');
      }
    });
    this.postservice.getPosts();
  }

  refreshPosts() {
    this.postservice.getPosts().subscribe((result) => {
      this.posts = result as Posts[];
    });
  }
  // deletePost(id) {
  //   console.log(this.posts);
  //   console.log(id);
  //   this.postservice.deletePost(id).subscribe(() => {
  //     this.posts.filter(x => x.id !== id);
  //   });
  // }
}
