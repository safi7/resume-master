import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export default class TransactionBasicService {
  constructor(private httpS: HttpService) { }

  fetchTransaction(requestOpt) {
    return this.httpS.get(`/transaction/cashout`, requestOpt);
  }

  canCancel(requestOpt) {
    return this.httpS.post(`/transaction/can-cancel`, requestOpt);
  }

  cancelTransaction(requestOpt) {
    return this.httpS.post(`/transaction/cancel-cashout`, requestOpt);
  }
}

export { TransactionBasicService };
