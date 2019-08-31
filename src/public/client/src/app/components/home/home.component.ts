import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Endpoint, NewEndpoint } from '../../app.interfaces';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newEndpoint: NewEndpoint = {
    url: '',
    statusCode: 200,
    responseTime: 500,
    frequency: 1,
    interval: 'hours',
  };
  endpointRefreshInterval: any;
  showInactive: boolean = false;

  constructor(public appService: AppService, private router: Router) {
  }

  ngOnInit(): void {
    this.appService.refreshEndpoints.next(true);
  }

  isInPast(nextDate: string): boolean {
    return new Date(nextDate) < new Date();
  }

  async saveEndpoint(): Promise<void> {
    try {
      await this.appService.saveEndpoint(this.newEndpoint);
      this.resetNewEndpoint();
      $('#addNewModal').modal('toggle');
      this.appService.refreshEndpoints.next(true);
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

  changeShowInactive(val: boolean) {
    this.showInactive = val;
  }

}
