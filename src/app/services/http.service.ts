import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private errorRoute = 'tabs/expeditors/authentication';
  constructor(private http: Http, private config: ConfigService, private router: Router) { }

  getList(route: string, params?: any): Observable<any[]> {
    return this.http.get(`${this.config.host}/${this.config[route]}`,
      new RequestOptions({
        params,
        headers: new Headers({
          Authorization: 'Bearer ' + this.config.getToken()
        })
      }))
      .pipe(map(response => response.json()))
      .pipe(catchError(this.handleError));
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
      .pipe(catchError(this.handleError));
  }

  getToken(data): any {
    return this.http.post(`${this.config.authHost}/${this.config.token}`, JSON.stringify(data),
      new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }))
      .pipe(map(response => response.json()))
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse){
    console.log(error.message);
    if(error.status == 401){
      this.router.navigate([this.errorRoute]);
    }
    return throwError(error);
    }
}
