import { Injectable } from '@angular/core';
import * as jwt from 'angular2-jwt';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Login, NewEndpoint, Endpoint, Register } from './app.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AppService {
  endpoints: Endpoint[];
  filteredEndpoints: Endpoint[] = [];
  refreshEndpoints: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor(private http: HttpClient) {}

  init(): void{
    this.getEndpoints();
    setInterval(() => this.getEndpoints(true), 60000);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return jwt.tokenNotExpired(null, token);
  }

  register(register: Register): Promise<any> {
    return this.http.post(`${environment.apiUrl}/auth/register`, register).toPromise().catch(this.handleErrors);
  }

  login(login: Login): Promise<any> {
    return this.http.post(`${environment.apiUrl}/auth/login`, login).toPromise().catch(this.handleErrors);
  }

  async getEndpoints(update = false): Promise<Endpoint[]> {
    if (this.endpoints && !update) {
      return this.endpoints;
    } else {
      const endpoints = await this.http.get(`${environment.apiUrl}/endpoint/fetch`).toPromise().catch(this.handleErrors) as Endpoint[];
      this.endpoints = endpoints;
      return this.endpoints;
    }
  }

  saveEndpoint(endpoint: NewEndpoint): Promise<any> {
    return this.http.post(`${environment.apiUrl}/endpoint/save`, endpoint).toPromise()
  }

  getEndpointMessages(endpointId: string): Promise<any> {
    return this.http.get(`${environment.apiUrl}/endpoint/messages/${endpointId}`).toPromise().catch(this.handleErrors);
  }

  manualCheckEndpoint(endpointId: string): Promise<any> {
    return this.http.post(`${environment.apiUrl}/endpoint/check/${endpointId}`, {}).toPromise().catch(this.handleErrors);
  }

  updateEndpointStatus(endpointId: string, isActive: boolean): Promise<any> {
    return this.http.put(`${environment.apiUrl}/endpoint/status/${endpointId}`, {isActive}).toPromise().catch(this.handleErrors);
  }

  deleteEndpoint(endpointId: string): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/endpoint/delete/${endpointId}`).toPromise().catch(this.handleErrors);
  }

  handleErrors(errorRes: HttpErrorResponse): void {
    console.log('AppService handleError()', errorRes.message || errorRes.statusText || 'Unknown error, please contact support');
  }

  // binding functions

  onEditEndpoint(endpoint: Endpoint): void {}
}
