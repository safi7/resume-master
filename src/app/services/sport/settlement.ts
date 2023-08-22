
import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export default class SettlementService {
  constructor(private httpS: HttpService) { }

  fetchMatchesStats(requestOpt: any, headers = {}) {
    return this.httpS.post(`/settlement/match-stats`, requestOpt, headers);
  }

  fetchIncompleteAll(requestOpt: any, headers = {}) {
    return this.httpS.get(`/settlement/incomplete-all`, requestOpt, headers);
  }

  fetchSettlementsByOddsIds(requestOpt: any) {
    return this.httpS.post(`/settlement/by-odds-ids`, requestOpt);
  }

  fetchMatchMarketStats(requestOpt: any) {
    return this.httpS.get(`/settlement`, requestOpt);
  }

  fetchMarketStats(requestOpt: any) {
    return this.httpS.get(`/settlement/settlement-stats/${requestOpt.match_id}/${requestOpt.market_id}`);
  }
}
