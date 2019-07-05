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
    // if accessToken is present in local storage...
    if (this._authorizationService.getAccessToken()) {
      request = this.addToken(request, this._authorizationService.getAccessToken());
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




