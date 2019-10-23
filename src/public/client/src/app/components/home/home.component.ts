import { Component } from '@angular/core';
import { AppService } from '../../app.service';
import { Endpoint } from '../../app.interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  endpointRefreshInterval: any;

  constructor(public appService: AppService, private router: Router) {
  }

  isInPast(nextDate: string): boolean {
    return new Date(nextDate) < new Date();
  }

  view(endpoint: Endpoint): void {
    this.router.navigate([`/endpoint/${endpoint._id}`]);
  }

}
