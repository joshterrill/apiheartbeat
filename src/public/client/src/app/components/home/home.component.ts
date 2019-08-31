import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../app.service';

declare const $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  endpoints: any[] = [];
  newEndpoint: any = {
    url: '',
    statusCode: 200,
    responseTime: 500,
    frequency: 1,
    interval: 'hours',
  };

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.init();
    setInterval(() => {
      this.init();
    }, 60000); // every minute
  }

  async init(): Promise<void> {
    try {
      this.endpoints = await this.appService.getEndpoints();
    } catch (error) {
      console.log('init error', error);
    }
  }

  isInPast(nextDate: string): boolean {
    return new Date(nextDate) < new Date();
  }

  async saveEndpoint(): Promise<void> {
    try {
      await this.appService.saveEndpoint(this.newEndpoint);
      this.resetNewEndpoint();
      $('#addNewModal').modal('toggle');
      this.init();
    } catch (error) {
      console.log('saveEndpoint error', error);
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

}
