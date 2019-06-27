import { Injectable } from '@angular/core';
import { Posts } from '../posts.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  constructor(private http: HttpClient) {}

  getPosts(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const request = this.http.get(environment.postsUrl, httpOptions);
    const postsObservables = new Observable(observer => {
      observer.next(request);
    });
    return postsObservables;
  }
}
