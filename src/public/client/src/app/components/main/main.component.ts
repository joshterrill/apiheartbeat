import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private appService: AppService) { }

  async ngOnInit(): Promise<void> {
    await this.appService.getEndpoints(true);
  }

}
