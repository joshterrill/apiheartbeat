import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { EndpointMessage, Endpoint } from 'src/app/app.interfaces';

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit, OnDestroy {

  endpoint: Endpoint;
  messages: EndpointMessage[] = [];
  messagesInterval: any;

  constructor(private activatedRoute: ActivatedRoute, private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.init();
    this.messagesInterval = setInterval(() => {
      this.init();
    }, 60000); // 60 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.messagesInterval);
  }

  async init(forceRefresh = false): Promise<void> {
    try {
      const endpointId = this.activatedRoute.snapshot.params['endpointId'];
      this.messages = await this.appService.getEndpointMessages(endpointId);
      await this.appService.getEndpoints(forceRefresh);
      this.endpoint = this.appService.endpoints.find(endpoint => endpoint._id === endpointId);
    } catch (error) {
      console.log('endpoint init error', error);
    }
  }

  async manualCheck(): Promise<void> {
    try {
      await this.appService.manualCheckEndpoint(this.endpoint._id);
      this.init(true);
    } catch (error) {
      console.log('endpoint manualCheck error', error);
    }
  }

  async deactivate(): Promise<void> {
    try {
      await this.appService.updateEndpointStatus(this.endpoint._id, false);
      await this.init(true);
    } catch (error) {
      console.log('endpoint deactivate error', error);
    }
  }

  async activate(): Promise<void> {
    try {
      await this.appService.updateEndpointStatus(this.endpoint._id, true);
      await this.init(true);
    } catch (error) {
      console.log('endpoint activate error', error);
    }
  }

  async delete(): Promise<void> {
    try {
      await this.appService.deleteEndpoint(this.endpoint._id);
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('endpoint delete error', error);
    }
  }

}
