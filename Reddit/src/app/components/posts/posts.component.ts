import { Component, OnInit } from '@angular/core';
import { Posts } from '../../posts.model';
import { PostServiceService } from '../../services/post-service.service';
import { Observable } from 'rxjs';
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
posts: Posts[] = [];
counter: number = 0;

  constructor(private postservice: PostServiceService) { }

  ngOnInit() {
    const postsObs = this.postservice.getPosts();
    postsObs.subscribe((postData: Posts[]) => {
      this.posts = postData;
    });
  }

}
