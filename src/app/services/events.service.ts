import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  refresh = new Subject<any>();
  reload = new Subject<any>();
  refreshToken = new Subject<any>();
  clearAll = new Subject<any>();



  constructor() { }

  public notifyRefresh(data: any) {
    if (data) {
      this.refresh.next(data);
    }
  }
  public notifyReload(data: any) {
    if (data) {
      this.reload.next(data);
    }
  }
  public notifyRefreshToken(data: any) {
    if (data) {
      this.refreshToken.next(data);
    }
  }
  public notifyClearAll() {
      this.clearAll.next();
  }
}
