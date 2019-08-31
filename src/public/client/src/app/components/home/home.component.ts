import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  endpoints: any[] = [];

  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    try {
      const endpoints = await this.appService.getEndpoints();
      this.endpoints = endpoints;
      console.log(this.endpoints);
    } catch (error) {
      console.log(error);
    }
  }

  isInPast(nextDate: string): boolean {
    return new Date(nextDate) < new Date();
  }

}
