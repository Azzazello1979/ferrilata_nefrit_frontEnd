import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class ChannelService {
  private httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json"
    })
  };

  constructor(private http: HttpClient, private router: Router) {}

  getAllChannels() {
    const request = this.http.get(environment.channelUrl, this.httpOptions);
    const channelObs = new Observable<any>(observer => {
      observer.next(request);
    });
    return request;
  }

  getSelectedChannel(channel) {
    const request = this.http.get(environment.channelUrl + channel);
    const selectedChannels = new Observable(observer => {
      observer.next(request);
    });
    return request;
  }
}
