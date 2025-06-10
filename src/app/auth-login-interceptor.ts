import { HttpRequest, HttpHandlerFn, HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth';
import { ApiResponse } from './models/model';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

function getCookie(name: string): string | null {
  const matches = document.cookie.match(new RegExp(
    '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
  ));
  return matches ? decodeURIComponent(matches[1]) : null;
}

function setCookie(name: string, value: string, days = 7): void {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export const AuthLoginInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const jwtToken = getCookie('JwtToken');

  let authReq = req;
  if (jwtToken) {
    authReq = req.clone({
      setHeaders: { Authorization: jwtToken }
    });
  }
  console.log(jwtToken);

  return next(authReq).pipe(
    catchError(error => {
      if (error.status !== 401) {
        return throwError(() => error);
      }
      const refreshToken = getCookie('RefreshToken');
      if (!refreshToken) {
        router.navigate(['/login']);
        return throwError(() => error);
      }
      if (authReq.headers.get("skip"))
        return next(req);
      console.log(authReq.headers.get("skip") == null);
      console.log("authReq.headers.get(");
      if (!isRefreshing) {
        console.log('No refresh in progress, starting token refresh');
        isRefreshing = true;
        refreshTokenSubject.next(null);
        console.log("response");
        return authService.getToken(refreshToken).pipe(
          switchMap((response: ApiResponse<any | null>) => {
            isRefreshing = false;
            console.log("response");
            console.log(response);
            if (response.success && response.data && Array.isArray(response.data) && response.data.length >= 2) {
              const newAccessToken = response.data[0];
              const newRefreshToken = response.data[1];
              setCookie('JwtToken', newAccessToken);
              setCookie('RefreshToken', newRefreshToken);
              console.log("inside new token methodv");
              console.log(newAccessToken);
              refreshTokenSubject.next(newAccessToken);
              const retryReq = req.clone({
                setHeaders: { Authorization: newAccessToken }
              });
              return next(retryReq);
            } else {
              router.navigate(['/login']);
              return throwError(() => new Error('Token refresh failed'));
            }
          }),
          catchError(err => {
            isRefreshing = false;
            router.navigate(['/login']);
            return throwError(() => err);
          })
        );
      } else {
        console.log('Refresh in progress, waiting for token...');
        return refreshTokenSubject.pipe(
          filter(token => token != null),
          take(1),
          switchMap(token => {
            console.log('New received');
            console.log(token);
            const retryReq = req.clone({
              setHeaders: { Authorization: token }
            });
            return next(retryReq);
          })
        );
      }
    })
  );
};



