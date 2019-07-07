import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { AuthorizationService } from './authorization.service';
import { catchError, filter, take, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ExpiredTokenInterceptorService implements HttpInterceptor {

  private isRefreshingInProgress = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private _authorizationService: AuthorizationService
  ) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if accessToken is present in local storage...
    if (this._authorizationService.getAccessToken()) {
      request = this.addToken(request, this._authorizationService.getAccessToken());
      // now, the captured request will be transformed by addToken() method and will contain the
      // access token in the header of the request: Authorization: Bearer xx.yy.zz
    }


    // Error handling for 401 - unauthorized (access token changed)
    // use catchError and listen for http errors...
    // handle modified request to next interceptor - or backend
    // if error is HttpErrorResponse of 401, try to refresh token
    return next.handle(request)
      .pipe(
        catchError(error => {
          if (error instanceof HttpErrorResponse && error.status === 401 && error.message === 'Expired token.') {
            return this.refreshAfter401(request, next);
          } else {
            return throwError(error);
          }
        }
        )
      );

  }


  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }



  private refreshAfter401(request: HttpRequest<any>, next: HttpHandler) {
    // execute token refreshing
    if (!this.isRefreshingInProgress) { // entering if isRefreshingInProgress = false
      this.isRefreshingInProgress = true;
      this.refreshTokenSubject.next(null);
      // the next emit from this subject will be null
      // this will block another request in the second part


      // calling doRefreshToken() to get a new access token
      return this._authorizationService.doRefreshToken()
        .pipe(
          switchMap((token: any) => {
            // Rxjs operator switchMap()... used on observables
            // switches observables ... cancels that observable that started
            // longer time ago in favor of the fresh observable ...
            // cancel old observable so you dont have to deal with the data that 
            // will eventually come back ... cancel http requests
            // emit the values of the fresh observable
            this.isRefreshingInProgress = false;
            // once we have new access token, we can indicate that refreshing finished...
            this.refreshTokenSubject.next(token.jwt);
            // ... and set refreshTokenSubject next emit to the fresh access token
            return next.handle(this.addToken(request, token.jwt));
          }));

      // blocking & releaseing all other queries that started during 
      // the refreshing process, which we want to put on hold until we have new 
      // access token
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
