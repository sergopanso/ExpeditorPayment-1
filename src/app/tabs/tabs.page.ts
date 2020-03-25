import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { ConfigService } from '../services/config.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  public selectedTab='people';
  constructor(private busEvents: EventsService, private httpService: HttpService, private config: ConfigService) {
    this.busEvents.tabButtonActivate.subscribe(data => {
      console.log(data);
      this.selectedTab = data;
    });
  }

  ngOnInit() {
  }

  select(title) {
    this.selectedTab = title;
    return true;
  }
}
