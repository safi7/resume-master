import _ from 'lodash';
import { HttpService } from '@services/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class CurrencyService {
  constructor(private httpS: HttpService) { }

  getCurrencyList(channel = 'public') {
    return this.httpS.get(`/currency`, {}, {}, channel);
  }
}

export { CurrencyService };
