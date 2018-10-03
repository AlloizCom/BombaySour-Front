import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {url} from './config/url';
import {isPlatformBrowser} from '@angular/common';
import {isNull} from 'util';
import {Observable} from "rxjs";

@Injectable()

export class MyInterceptor implements HttpInterceptor {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
  }

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    req = req.clone({url: url + req.url});
    if (isPlatformBrowser(this.platformId)) {
      req = req.clone({headers: this.getHeaders(req)});
    }
    return next.handle(req);
  }

  getHeaders(req: HttpRequest<any>): HttpHeaders {
    // console.log('interceptor');
    let headers = new HttpHeaders();
    let temp: HttpRequest<any>;
    if (isNull(req.headers)) {
      temp = req.clone({headers});
    } else {
      temp = req.clone();
    }
    headers = temp.headers;
    if (temp.params.has('password')) {
      // if (temp.headers.keys().indexOf('Authorization') != -1) {
      headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
      headers = headers.append('Authorization', 'Basic  Y2xpZW50X3BhbG1hX2hvdGVsLmNvbTpzZWNyZXRfcGFsbWFzZXJ2ZXIuY29t');
      // headers = headers.append('authorization', 'Basic Y2xpZW50X2d1aWxkX29mX3RlYWNoZXJzLmNvbTpzZWNyZXRfMDEwc2VydmVyLmNvbQ==');
    } else {
      // console.log('this._userService.checkAuth() : ', this._userService.checkAuth());
      if (temp.headers.keys().indexOf('enctype') != -1) {
        // headers = headers.set('Content-type', 'application/x-www-form-urlencoded');
        // console.log('headers.set(\'enctype\')');
        headers = headers.set('enctype', 'form-data/multipart');
      } else {
        // if (this._userService.checkAuth()) {
        //   headers = headers.append('Authorization', `Bearer ${this._userService.getAccessToken()}`);
        // }
        if (temp.headers.keys().indexOf('Content-Type') != -1) {
          if (temp.headers.get('Content-Type').indexOf('application/json') == -1) {
            // console.log('headers.set(\'Content-Type\', temp.headers.get(\'Content-Ty pe\') + \';application/json\')');
            headers = headers.set('Content-Type', temp.headers.get('Content-Type') + ';application/json');
          }
        } else {
          // console.log('headers.append(\'Content-Type\', \'application/json\')');
          headers = headers.append('Content-Type', 'application/json');
        }
      }
    }
    headers = headers.append('Accept', 'application/json');
    return headers;
  }
}
