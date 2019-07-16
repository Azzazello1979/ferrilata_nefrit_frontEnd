import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class PostServiceService {
  constructor(private http: HttpClient) {}

  getPosts(): any {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const request = this.http.get(environment.postsUrl, httpOptions);
    new Observable(observer => {
      observer.next(request);
    });
    return request;
  }

  filterPosts(selectedChannel): any {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    const request = this.http.get(
      environment.postsUrl + `${selectedChannel.channel}`,
      httpOptions
    );
    new Observable(observer => {
      observer.next(request);
    });
    return request;
  }
}
