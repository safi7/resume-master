import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import _ from 'lodash';


@Injectable({ providedIn: 'root' })
export default class TicketService {
  constructor(private httpS: HttpService,
  ) { }


  getTickets(requestOpt = null) {
    return this.httpS.post(`/ticket/list`, requestOpt);
  }

  getTicketsCashout(requestOpt = null) {
    return this.httpS.post(`/ticket/cashout`, requestOpt);
  }

  fetchTicket(requestOpt) {
    return this.httpS.get(`/ticket/${requestOpt.id}`);
  }

  getConfirmedTickets(requestOpt = null) {
    return this.httpS.post(`/ticket/confirmed`, requestOpt);
  }

  fetchTicketCashout(requestOpt) {
    return this.httpS.get(`/ticket/cashout`, requestOpt);
  }

  fetchOutrights(requestOpt = {}) {
    return this.httpS.post(`/ticket/outrights`, requestOpt);
  }
  getStatusHistory(requestOpt) {
    return this.httpS.post(`/ticket/status-history`, requestOpt);
  }
}

export { TicketService };
