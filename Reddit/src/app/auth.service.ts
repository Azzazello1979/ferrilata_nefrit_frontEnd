import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
// const jwt = require('jsonwebtoken'); //FIXME

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public username: BehaviorSubject<any> = new BehaviorSubject(1);
  obs = this.username.asObservable();
  public checker: Subject<boolean> = new Subject;
  obs2 = this.checker.asObservable();

  constructor(private http: HttpClient) {
  }

  get user(): BehaviorSubject<string> {
    return this.username
  }

  sendData(username: string, password: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    // let token = jwt.sign(payload, 'secretKey'); //FIXME
    // headers = headers.append('Authorization', '');
    let payload = {
      username: username,
      password: password
    };
    this.http.post('http://localhost:3000/login', payload, { headers: headers }).subscribe(
      res => {
        this.username.next({ succes: true, username });
        this.checker.next(true) 
      },
      err => {
        this.checker.next(false) 
      })
  }
};