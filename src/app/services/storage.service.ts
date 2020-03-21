import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { EventsService } from './events.service';
import { ConfigService } from './config.service';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public customer: any;
  public expeditor: any;
  public invoice: any;
  constructor(private busService: EventsService, private httpService: HttpService, private config: ConfigService) { }

  getDataList(route: string, parameters?: any): Observable<any[]> {
    let key = `${route}`;
    if (parameters) {
      for (let prop in parameters) {
        key = `${key}${parameters[prop]}`;
      }
    }
    const entities = JSON.parse(localStorage.getItem(key));
    const that = this;
    return entities != null && entities.length ? of(entities) : this.httpService.getList(route, parameters)
      .pipe(map(result => {
        localStorage.setItem(key, JSON.stringify(result));
        return result;
      })
      );
  }
  getDataItem(route: string, parameters?: any): Observable<any> {
    let key = `${route}`;
    if (parameters) {
      for (let prop in parameters) {
        key = `${key}${parameters[prop]}`;
      }
    }
    const entities = JSON.parse(localStorage.getItem(key));
    const that = this;
    return entities != null && entities.length ? of(entities) : this.httpService.getItem(route, parameters)
      .pipe(map(result => {
        localStorage.setItem(key, JSON.stringify(result));
        return result;
      })
      );
  }
  setToken(data: any): Observable<any> {
    const token = this.config.getAuth();
    const that = this;
    return this.httpService.getToken(data)
      .pipe(map(result => {
        this.config.setAuth(result);
        return result;
      })
      );
  }
  clearDataByKey(key: string) {
    localStorage.removeItem(key);
  }
  clearData() {
    const token = this.config.getAuth();
    localStorage.clear();
    if (token) {
      this.config.setAuth(token);
    }
  }
}
