import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})

export class ExpiredTokenInterceptorService implements HttpInterceptor {

  constructor(
    private _authorizationService: AuthorizationService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>{
    
    if (this._authorizationService.getAccessToken()) { // if accessToken is present in local storage...
      request = this.addToken(request, this._authorizationService.getAccessToken());
      // now, the captured request will be transformed by addToken() method and will contain the
      // token in the header of the request: Authorization: Bearer xx.yy.zz
    }
  }


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }




}




