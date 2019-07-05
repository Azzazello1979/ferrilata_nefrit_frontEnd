import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  private readonly accessToken = 'accessToken';

  constructor() { }


  getAccessToken() {
    return localStorage.getItem(this.accessToken);
  }


}
