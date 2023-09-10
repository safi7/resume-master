import * as moment from 'moment-timezone';

import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MessageService } from '@services/message.service';
import { environment } from '@env/environment';
// import CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export default class HttpService {
  baseApiPath = `https://builder.zety.com/eb/api/v1`;

  constructor(
    private http: HttpClient,
    private messageS: MessageService,
  ) { }

  get(path, payload = {}, httpOpts = {}, channel = 'public', baseurl = null) {
    this.messageS.restart(channel);
    // prettier-ignore
    const qs = this.queryString(payload);
    let url = !baseurl ? this.baseApiPath + path : baseurl + path;
    if (qs.length) {
      url += '?' + qs;
    }
    return (
      this.http
        .get<any>(url, {
          headers: httpOpts
        })
        .pipe(
          catchError(this.handlingError(channel).bind(this)),
          map(response => response)
        )
    );
  }

  post(path, payload, httpOpts = {}, channel = 'public') {
    this.messageS.restart(channel);
    // console.log(`Calling POST ${path}`, payload, {
    //   headers: httpOpts
    // });
    // prettier-ignore
    return (
      this.http
        .post<any>(this.baseApiPath + path, payload, {
          headers: httpOpts
        })
        .pipe(
          catchError(this.handlingError(channel).bind(this)),
          map(response => response)
        )
    );
  }

  put(path, payload, httpOpts = {}, channel = 'public') {
    this.messageS.restart(channel);

    // console.log(`Calling PUT ${path}`, payload);
    // prettier-ignore
    httpOpts = { ...httpOpts };
    return (
      this.http
        .put<any>(this.baseApiPath + path, payload, {
          headers: httpOpts
        })
        .pipe(
          catchError(this.handlingError(channel).bind(this)),
          map(response => response)
        )
    );
  }


  delete(path, channel = 'public') {
    this.messageS.restart(channel);
    return (
      this.http
        .delete<any>(this.baseApiPath + path)
        .pipe(
          catchError(this.handlingError(channel).bind(this)),
          map(response => response)
        )
    );
  }
  queryString(payload) {
    const queries = [];
    for (const key of Object.keys(payload)) {
      if (payload[key] !== null) {
        queries.push(key + '=' + payload[key]);
      }
    }
    return queries.join('&');
  }

  handlingError = channel => error => {
    this.messageS.updateEnvelop({
      channel,
      message: error.message,
    });
    return throwError(error);
  }
}

export { HttpService };
