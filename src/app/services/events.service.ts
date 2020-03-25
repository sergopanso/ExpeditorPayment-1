import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  refresh = new Subject<string>();
  tabButtonActivate = new Subject<string>();
  constructor() { }

  public notifyRefresh(data: string) {
    if (data) {
      this.refresh.next(data);
    }
  }
  public notifyTabButtonActivate(data: string) {
    if (data) {
      this.tabButtonActivate.next(data);
    }
  }
}
