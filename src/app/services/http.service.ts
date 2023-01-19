import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ConfigService } from './config.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { EventsService } from './events.service';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  private errorRoute = 'tabs/expeditors/authentication';
  /*constructor(private http: Http, private config: ConfigService, private router: Router, private events: EventsService) { }*/

  constructor(private http: Http, private config: ConfigService, private router: Router, private events: EventsService) { }

  getList(route: string, params?: any): Observable<any[]> {
    return this.http.get(`${this.config.host}/${this.config[route]}`,
      new RequestOptions({
        params,
        headers: new Headers({
          Authorization: 'Bearer ' + this.config.getToken()
        })
      }))
      .pipe(map(response => response.json()))
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log(error.statusText);
        if (error.status === 401) {
          this.events.notifyTabButtonActivate('person');
          this.router.navigate([this.errorRoute]);
        }
        return throwError(error);
      }));
  }

  getItem(route: string, params?: any): Observable<any> {
    return this.http.get(`${this.config.host}/${route}`,
      new RequestOptions({
        params,
        headers: new Headers({
          Authorization: 'Bearer ' + this.config.getToken()
        })
      }))
      .pipe(map(response => response.json()))
      .pipe(catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.events.notifyTabButtonActivate('person');
          this.router.navigate([this.errorRoute]);
        }
        return throwError(error);
      }));
  }

  getToken(data: any): any {
    return this.http.post(`${this.config.authHost}/${this.config.token}`, JSON.stringify(data),
      new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }))
      .pipe(map(response => response.json()))
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log(error.statusText);
        if (error.status === 401) {
          this.events.notifyTabButtonActivate('person');
          this.router.navigate([this.errorRoute]);
        }
        return throwError(error);
      }));
  }

  savePayment(payment: any): any {
    return this.http.post(`${this.config.host}/${this.config.save}`, JSON.stringify(payment),
      new RequestOptions({
        headers: new Headers({
          Authorization: 'Bearer ' + this.config.getToken(),
          'Content-Type': 'application/json'
        })
      }))
      .pipe(map(response => response.json()))
      .pipe(catchError((error: HttpErrorResponse) => {
        console.log(error.statusText);
        if (error.status === 401) {
          this.events.notifyTabButtonActivate('person');
          this.router.navigate([this.errorRoute]);
        }
        return throwError(error);
      }));
  }

  handleError(error: HttpErrorResponse) {
    console.log(error.statusText);
    if (error.status === 401) {
      this.router.navigate([this.errorRoute]);
    }
    return throwError(error);
  }
}
