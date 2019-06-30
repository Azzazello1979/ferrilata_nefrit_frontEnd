import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(request, next){
    let tokenizedRequest = request.clone({
      setHeaders: {
        Authorization: 'Bearer xx.yy.zz'
      }
    })
    return next.handle(tokenizedRequest)

  }
}
