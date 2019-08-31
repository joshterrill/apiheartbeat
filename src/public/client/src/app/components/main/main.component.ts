import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  endpointRefreshInterval: any;
  refreshBehaviorSubject: Subscription;

  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.endpointRefreshInterval = setInterval(() => {
      this.init();
    }, 60000); // every minute
    this.refreshBehaviorSubject = this.appService.refreshEndpoints.subscribe(non => this.init());
  }

  ngOnDestroy(): void {
    clearInterval(this.endpointRefreshInterval);
    if (this.refreshBehaviorSubject) this.refreshBehaviorSubject.unsubscribe();
  }

  async init(): Promise<void> {
    try {
      this.appService.endpoints = await this.appService.getEndpoints();
    } catch (error) {
      console.log('home init error', error);
    }
  }

}
