import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from './base-http.service';

@Injectable({ providedIn: 'root' })
export default class SportsmapService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  getSportsMap() {
    return this.get(`/sportsmap/mapping`);
  }
}

export { SportsmapService };
