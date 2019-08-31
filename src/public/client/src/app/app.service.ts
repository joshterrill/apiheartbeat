import { Injectable } from '@angular/core';
import * as jwt from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  public getToken(): string {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return jwt.tokenNotExpired(null, token);
  }

  getEndpoints(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/endpoint/fetch`).toPromise();
  }

  saveEndpoint(endpoint): Promise<any> {
    return this.http.post(`${environment.apiUrl}/endpoint/save`, endpoint).toPromise()
  }
}
