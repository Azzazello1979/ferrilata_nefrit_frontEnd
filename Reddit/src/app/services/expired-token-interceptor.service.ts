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

    // when interceptor catches 401 error code in request, it runs refreshAfter401() method
    // this 401 happens when access token changes
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
    if (!this.isRefreshingInProgress) { // entering if isRefreshingInProgress = false (so refreshing hasnt started yet)
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
            // we get the new access token ... and set refreshTokenSubject next emit to the fresh access token
            return next.handle(this.addToken(request, token.jwt));
          }));

      // during refreshing: after requesting new access token and before receiving it back,
      // new httprequest may happen and interceptor may catch them and process them ...
      //
      // blocking & releaseing all other queries that started during 
      // the refreshing process, which we want to put on hold until we have new 
      // access token
    } else {
      return this.refreshTokenSubject
      // during refreshing, the value inside this subject is null
      .pipe(
        filter(token => token != null),
        // this filter would block all requests until the value inside that subject is different than null,
        // that happens in line 81 
        take(1), // transform to observable which will finish after taking 1 event from the subject
        switchMap(jwt => { // then unblock the query that started in line 91
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
