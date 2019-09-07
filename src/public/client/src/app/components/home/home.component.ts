import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { Endpoint, NewEndpoint } from '../../app.interfaces';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  newEndpoint: NewEndpoint = {
    url: '',
    statusCode: 200,
    responseTime: 500,
    frequency: 1,
    interval: 'hours',
  };
  endpointRefreshInterval: any;

  constructor(public appService: AppService, private router: Router) {
  }

  isInPast(nextDate: string): boolean {
    return new Date(nextDate) < new Date();
  }

  async saveEndpoint(): Promise<void> {
    try {
      await this.appService.saveEndpoint(this.newEndpoint);
      this.resetNewEndpoint();
      $('#addNewModal').modal('toggle');
      await this.appService.getEndpoints(true);
    } catch (error) {
      console.log('home saveEndpoint error', error);
    }
  }

  resetNewEndpoint(): void {
    this.newEndpoint = {
      url: '',
      statusCode: 200,
      responseTime: 500,
      frequency: 1,
      interval: 'hours',
    };
  }

  view(endpoint: Endpoint): void {
    this.router.navigate([`/endpoint/${endpoint._id}`]);
  }

}
