import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Posts } from '../posts.model';
import { config } from '../config';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getPosts(): Observable<Posts[]> {
    const request = this.http.get<Posts[]>(environment.postsUrl, this.httpOptions);
    const postsObservables = new Observable(observer => {
    });
    return request;
  }

  filterPosts(selectedChannel): any {
    const request = this.http.get(
      environment.postsUrl + `${selectedChannel.channel}`,
      this.httpOptions
    );
  }

  deletePost(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(config.postsUrl + id, httpOptions);
  }
  createPosts(post): any {
    this.http.post(
      environment.postsUrl,
      post,
      this.httpOptions
    ).subscribe();
  }
}
