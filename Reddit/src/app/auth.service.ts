import { Injectable } from '@angular/core';
const jwt = require('jsonwebtoken'); //FIXME

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  sendData(username: string, password: string) {
    let payload = {
      user: username,
      word: password
    };
    // if(response.message=="Wrong username or password."){return false}
    // else{}
    let token = jwt.sign(payload, 'secretKey'); //FIXME
    return true
  }
}