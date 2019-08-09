import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Posts } from "../posts.model";
import { config } from "../config";

@Injectable({
  providedIn: "root"
})
export class PostServiceService {
  constructor(private http: HttpClient) {}
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  getPosts(): Observable<Posts[]> {
    const request = this.http.get<Posts[]>(
      environment.postsUrl,
      this.httpOptions
    );
    new Observable(observer => {});
    return request;
  }

  filterPosts(params?, query?): any {
    let checkParams;
    if (params) {
      checkParams = environment.postsUrl + params + "?filter=" + query.filter;
    } else {
      checkParams = environment.postsUrl + "?filter=" + query.filter;
    }
    const request = this.http.get(checkParams, this.httpOptions);
    return request;
  }

  deletePost(id: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.delete(config.postsUrl + id, httpOptions);
  }
  createPosts(post): any {
    this.http.post(environment.postsUrl, post, this.httpOptions).subscribe();
  }
}
