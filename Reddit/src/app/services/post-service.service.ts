import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PostServiceService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient) {}

  getPosts(): any {
    const request = this.http.get(environment.postsUrl, this.httpOptions);
    new Observable(observer => {
      observer.next(request);
    });
    return request;
  }

  filterPosts(selectedChannel): any {
    const request = this.http.get(
      environment.postsUrl + `${selectedChannel.channel}`,
      this.httpOptions
    );
    new Observable(observer => {
      observer.next(request);
    });
    return request;
  }

  createPosts(post): any {
    this.http.post(
      environment.postsUrl,
      post,
      this.httpOptions
    ).subscribe();
  }

  newPosts(): any {
    const request = this.http.get(
      environment.postsUrl,
      this.httpOptions
    );
    new Observable(observer => {
      observer.next(request);
    });
    return request;
  }
}