import { Component, OnInit, Input } from '@angular/core';
import { NewEndpoint, Endpoint } from 'src/app/app.interfaces';
import { AppService } from 'src/app/app.service';

declare const $: any;

@Component({
  selector: 'app-add-edit-endpoint',
  templateUrl: './add-edit-endpoint.component.html',
  styleUrls: ['./add-edit-endpoint.component.scss']
})
export class AddEditEndpointComponent implements OnInit {

  @Input() isAddNew: boolean = true;

  newEndpoint: NewEndpoint = {
    url: '',
    statusCode: 200,
    responseTime: 500,
    frequency: 1,
    interval: 'hours',
    timeToWaitBetweenNotificationsFrequency: 15,
    timeToWaitBetweenNotificationsInterval: 'minutes',
  };

  constructor(private appService: AppService) {
    this.appService.onEditEndpoint = this.onEditEndpoint.bind(this);
  }

  ngOnInit() {
  }

  onEditEndpoint(endpoint: Endpoint): void {
    console.log(endpoint);
    this.newEndpoint = endpoint;
    // this.newEndpoint.url = endpoint.url;
    // this.newEndpoint.statusCode = endpoint.statusCode;
    // this.newEndpoint.responseTime = endpoint.responseTime;
    // this.newEndpoint.frequency = endpoint.frequency;
    // this.newEndpoint.interval = endpoint.interval;
    // this.newEndpoint.timeToWaitBetweenNotificationsFrequency = endpoint.timeToWaitBetweenNotificationsFrequency;
    // this.newEndpoint.timeToWaitBetweenNotificationsInterval = endpoint.timeToWaitBetweenNotificationsInterval;
  }

  async saveEndpoint(): Promise<void> {
    try {
      await this.appService.saveEndpoint(this.newEndpoint);
      this.resetNewEndpoint();
      $('#addEditModal').modal('toggle');
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
      timeToWaitBetweenNotificationsFrequency: 15,
      timeToWaitBetweenNotificationsInterval: 'minutes',
    };
  }

}
