import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { EndpointMessage, Endpoint } from 'src/app/app.interfaces';

declare const $: any;

@Component({
  selector: 'app-endpoint',
  templateUrl: './endpoint.component.html',
  styleUrls: ['./endpoint.component.scss']
})
export class EndpointComponent implements OnInit, OnDestroy {

  endpoint: Endpoint;
  messages: EndpointMessage[] = [];
  messagesInterval: any;
  allLoaded: boolean = false;
  loadingMore: boolean = false;

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

  async init(forceRefresh = false, loadAll = false): Promise<void> {
    try {
      const endpointId = this.activatedRoute.snapshot.params['endpointId'];
      this.messages = await this.appService.getEndpointMessages(endpointId, loadAll);
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
      await this.appService.getEndpoints();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log('endpoint delete error', error);
    }
  }

  async loadAll(): Promise<void> {
    try {
      this.loadingMore = true;
      await this.init(true, true);
      this.loadingMore = false;
      this.allLoaded = true;
    } catch (error) {
      console.log('endpoint loadAll error', error);
      this.loadingMore = false;
    }
  }

  editEndpoint(): void {
    $('#addEditModal').modal('toggle');
    this.appService.onEditEndpoint(this.endpoint);
  }

}
