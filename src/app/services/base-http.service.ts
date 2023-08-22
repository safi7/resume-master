import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as moment from 'moment-timezone';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export default class BaseHttpService {
  baseApiPath = `//${environment.apiHost}/1.0`;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  get(path) {
    // prettier-ignore
    return (
      this.http
        .get<any>(this.baseApiPath + path)
        .pipe(map(response => response))
    );
  }

  post(path, data) {
    // console.log(`Calling POST ${path}`, data);
    // prettier-ignore
    return (
      this.http
        .post<any>(this.baseApiPath + path, data)
        .pipe(map(response => response))
    );
  }

  put(path, data, httpOpts?: any) {
    // console.log(`Calling PUT ${path}`, data);
    // prettier-ignore
    return (
      this.http
        .put<any>(this.baseApiPath + path, data, httpOpts)
        .pipe(map(response => response))
    );
  }

  makeQueryString(requestOpt) {
    const queries = [];
    for (const key of Object.keys(requestOpt)) {
      queries.push(key + '=' + requestOpt[key]);
    }
    return queries.join('&');
  }

  defaultDateRange() {
    const t = moment().utcOffset('-04:00');
    const from = t.format('YYYY-MM-DD 04:00:00');
    const to = t.add(1, 'days').format('YYYY-MM-DD 04:00:00');
    return { from, to };
  }
}

export { BaseHttpService };
