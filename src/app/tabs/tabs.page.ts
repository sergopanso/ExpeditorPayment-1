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

  constructor(private busEvents: EventsService, private httpService: HttpService, private config: ConfigService) {
    this.busEvents.refreshToken.subscribe(route => {
      this.httpService.getToken().subscribe(token => {
        if (token) {
          this.config.setAuth(token);
          this.busEvents.notifyReload(route);
        }
      },
        error => {
          console.log(error);
          if (error.status === 401) {
            localStorage.clear();
          }
        });
    });
  }

  ngOnInit() {
  }

}
