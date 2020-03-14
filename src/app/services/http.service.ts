import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: Http, private config: ConfigService) { }

  getList(route: string, params?: any): Observable<any[]> {
    return this.http.get(`${this.config.host}/${this.config[route]}`,
      new RequestOptions({
        params,
        headers: new Headers({
          Authorization: 'Bearer ' + this.config.getToken()
        })
      }))
      .pipe(map(response => response.json()))
      .pipe(catchError((error: any) => {
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
      .pipe(catchError((error: any) => {
        return throwError(error);
      }));
  }
  getToken(): any {
    const data = {
      email: this.config.username,
      password: this.config.password,
      // required when signing up with username/password
      grant_type: 'password'
    };
    return this.http.post(this.config.token, this.config.toUrlEncodedString(data),
      new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }))
      .pipe(map(response => response.json()))
      .pipe(catchError((error: any) => {
        return throwError(error);
      }));
  }
  private encodeParams(params: any): URLSearchParams {
    return Object.keys(params)
      .filter(key => params[key])
      .reduce((accum: URLSearchParams, key: string) => {
        accum.append(key, params[key]);
        return accum;
      }, new URLSearchParams());
  }
}
