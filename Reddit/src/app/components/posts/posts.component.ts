import { Component, OnInit } from "@angular/core";
import { Posts } from "../../posts.model";
import { PostServiceService } from "../../services/post-service.service";
import { ActivatedRoute, Params } from "@angular/router";

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
  posts: Posts[] = [];

  constructor(
    private postservice: PostServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /* const postsObs = this.postservice.getPosts();
    postsObs.subscribe((postData: Posts[]) => {
      this.posts = postData;
    }); */
    this.route.params.subscribe((selectedChannel: Params) => {
      this.postservice
        .filterPosts(selectedChannel)
        .subscribe((postData: Posts[]) => {
          this.posts = postData;
        });
    });
  }

  ngOnChanges() {
    this.route.params.subscribe((selectedChannel: Params) => {
      this.postservice
        .filterPosts(selectedChannel)
        .subscribe((postData: Posts[]) => {
          this.posts = postData;
        });
    });
  }
}
