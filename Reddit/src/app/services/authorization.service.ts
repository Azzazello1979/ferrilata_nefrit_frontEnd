import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';



@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {



  API_URL = 'http://localhost:4200'; //move to enviroment variable!

  private readonly accessToken = 'accessToken';
  private readonly refreshToken = 'refreshToken';

  constructor(
    private http: HttpClient
  ) { }


  getAccessToken() {
    return localStorage.getItem(this.accessToken);
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshToken);
  }


  storeAccessToken(jwt: string) {
    localStorage.setItem(this.accessToken, jwt);
  }


  storeTokens(tokens: Tokens) {
    localStorage.setItem(this.accessToken, tokens.jwt);
    localStorage.setItem(this.refreshToken, tokens.refreshToken);
  }



 // send locally stored refreshToken to /refresh endpoint
 // this is an observable
  doRefreshToken() {
    return this.http.post<any>(`${this.API_URL}/refresh`, {
      'refreshToken': this.getRefreshToken()
    })
      .pipe(
        tap((tokens: Tokens) => {
          this.storeAccessToken(tokens.jwt);
        }
        )
      );
  }





}
