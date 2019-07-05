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



  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingInProgress) {
      this.isRefreshingInProgress = true;
      this.refreshTokenSubject.next(null);

      return this._authorizationService.doRefreshToken().pipe(
        switchMap((token: any) => {
          this.isRefreshingInProgress = false;
          this.refreshTokenSubject.next(token.jwt);
          return next.handle(this.addToken(request, token.jwt));
        }));

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









