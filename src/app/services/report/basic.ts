import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export default class ReportsBasicService {
  constructor(private httpS: HttpService) { }

  fetchOddsDifferences(requestOpt = {}) {
    return this.httpS.get(`/reports/odds-difference`, requestOpt);
  }

  fetchOddsDifferencesByProfileId(requestOpt = {}) {
    return this.httpS.get(`/reports/odds-difference/tournaments`, requestOpt);
  }

  fetchOddsDifferencesByTournamentId(requestOpt = {}) {
    return this.httpS.get(`/reports/odds-difference/odds`, requestOpt);
  }

  fetchSportDisplayMarkets(requestOpt) {
    return this.httpS.get(`/reports/ticket-balance-binary/markets/${requestOpt.sport_id}`,);
  }

  fetchTicketBalanceBinary(requestOpt) {
    return this.httpS.get(`/reports/ticket-balance-binary`, requestOpt);
  }

  fetchTicketBalanceBinaryDetails(requestOpt) {
    return this.httpS.get(`/reports/ticket-balance-binary/details`, requestOpt);
  }
}

export { ReportsBasicService };
