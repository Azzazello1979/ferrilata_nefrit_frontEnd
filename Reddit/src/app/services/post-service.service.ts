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

  getPosts(): Observable<Posts[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const request = this.http.get<Posts[]>(environment.postsUrl, httpOptions);
    const postsObservables = new Observable(observer => {
      observer.next(request);
    });
    return request;
  }

  deletePost(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete(config.postsUrl + id, httpOptions);
  }
}
