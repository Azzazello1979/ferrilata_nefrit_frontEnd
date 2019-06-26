import { Component, OnInit } from '@angular/core';
import { Posts } from '../../posts.model';
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

  constructor(private posts: Posts) { }

  ngOnInit() {

  }

}
