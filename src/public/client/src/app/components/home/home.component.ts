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
      console.log(error);
    }
  }

  isInPast(nextDate: string): boolean {
    return new Date(nextDate) < new Date();
  }

}
