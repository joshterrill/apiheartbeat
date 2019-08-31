import { Injectable } from '@angular/core';
import * as jwt from 'angular2-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login, NewEndpoint, Endpoint } from './app.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  endpoints: Endpoint[] = [];
  filteredEndpoints: Endpoint[] = [];
  refreshEndpoints: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private http: HttpClient) {}

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return jwt.tokenNotExpired(null, token);
  }

  login(login: Login): Promise<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, login).toPromise();
  }

  getEndpoints(): Promise<any> {
    return this.http.get(`${environment.apiUrl}/endpoint/fetch`).toPromise();
  }

  saveEndpoint(endpoint: NewEndpoint): Promise<any> {
    return this.http.post(`${environment.apiUrl}/endpoint/save`, endpoint).toPromise()
  }

  getEndpointMessages(endpointId: string): Promise<any> {
    return this.http.get(`${environment.apiUrl}/endpoint/messages/${endpointId}`).toPromise();
  }

  manualCheckEndpoint(endpointId: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/endpoint/check/${endpointId}`, {}).toPromise();
  }

  updateEndpointStatus(endpointId: string, isActive: boolean): Promise<any> {
    return this.http.put(`${environment.apiUrl}/endpoint/status/${endpointId}`, {isActive}).toPromise();
  }

  deleteEndpoint(endpointId: string): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/endpoint/delete/${endpointId}`).toPromise();
  }
}
