import { Injectable } from '@angular/core';
import { HttpEvent, HttpErrorResponse, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private appService: AppService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.appService.getToken()}`
      }
    });
    return next.handle(req).catch(
      (err: HttpErrorResponse) => {
        if (this.router.url !== '/login' && (err.status === 401 || err.status === 403)) {
          this.router.navigate(['/login']);
        }
        return Observable.throw(err);
      }
    );
  }
}
