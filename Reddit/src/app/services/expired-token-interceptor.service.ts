import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ExpiredTokenInterceptorService implements HttpInterceptor {

  constructor(
    private _authorizationService: AuthorizationService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    // if accessToken is present in local storage...
    if (this._authorizationService.getAccessToken()) {
      request = this.addToken(request, this._authorizationService.getAccessToken());
      // now, the captured request will be transformed by addToken() method and will contain the
      // token in the header of the request: Authorization: Bearer xx.yy.zz
    }
    // if accessToken not present in local storage...
    // use catchError and listen for http errors...
    return next.handle(request)
    .pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 && error.message === 'Expired token.') {
        return this.handle401Error(request, next);
      } else {
        return throwError(error);
      }
    }));

  }


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }




}




