import { Injectable } from '@angular/core';
const jwt = require('jsonwebtoken');

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
    // send(token){
    // if(response){return true /false }}
    let token = jwt.sign(payload, 'secretKey');
    return false
  }
}