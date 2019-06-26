import { Injectable } from '@angular/core';
import { Posts } from '../posts.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  posts: Posts[] = [
    // {
    //   id: '5d132cf4237ea11478a7e58a',
    //   title: 'title',
    //   content: 'content',
    //   channel: 'channel',
    //   timestamp: 6706754409533014017
    // },
    // {
    //   id: '5d132f91237ea11478a7e58c',
    //   title: 'title',
    //   content: 'content',
    //   channel: 'channel',
    //   timestamp: 6706756737405288449
    // },
    // {
    //   id: '5d132f91237ea11478a7e58c',
    //   title: 'title',
    //   content: 'content',
    //   channel: 'channel',
    //   timestamp: 6706756737405288449
    // }
  ];
  constructor() {}

  getPosts(): any {
    const postsObservables = new Observable(
      observer => {
      observer.next(this.posts);
      }
    );
    return postsObservables;
  }
}
