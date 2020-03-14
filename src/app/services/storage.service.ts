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
    const key = parameters ? `${route}${parameters}` : route;
    const entitiesString = localStorage.getItem(key);
    // const entities: any[] = entitiesString ? JSON.parse(entitiesString) : [];
    const entities: any[] = [];
    return entities.length ? of(entities) : this.httpService.getList(route, parameters)
      .pipe(map(result => {
        // this.setLocalStorageValue(key, result);
        return result;
      })
      );
  }
  refreshDataItem(route: string, parameters: any): any {
    const entitiesString = localStorage.getItem(route);

    const entity = entitiesString ? JSON.parse(entitiesString) : '';
    return entity;
  }
  downloadDataItem(route: string, parameters: any): Observable<any> {

    const entities$ = this.httpService.getItem(route, parameters);
    return entities$;
  }
  setLocalStorageValue(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  setLocalStorageList(key: string, value: any[]) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  getLocalStorageValue(key: string): any {
    const entitiesString = localStorage.getItem(key);
    const entity = entitiesString ? JSON.parse(entitiesString) : '';
    return entity;
  }
  getLocalStorageList(key: string): any[] {
    const entitiesString = localStorage.getItem(key);
    const entity = entitiesString ? JSON.parse(entitiesString) : [];
    return entity;
  }
  clearData() {
    const token = this.config.getAuth();
    localStorage.clear();
    if (token) {
      this.config.setAuth(token);
    }
  }
}
