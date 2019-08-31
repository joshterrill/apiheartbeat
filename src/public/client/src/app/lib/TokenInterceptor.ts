import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private appService: AppService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.appService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
