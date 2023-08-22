import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export default class SportBasicService {
  constructor(private httpS: HttpService) { }


  fetchSport(requestOpt = {}) {
    return this.httpS.get(`/sport`, requestOpt);
  }

  fetchList(requestOpt = {}) {
    return this.httpS.get(`/sport/list`, requestOpt);
  }

  fetchMarkets(requestOpt = {}) {
    return this.httpS.get(`/sport/markets`, requestOpt);
  }

  fetchMarketTypes(requestOpt = {}) {
    return this.httpS.get(`/sport/market-types`, requestOpt);
  }

  fetchSports(requestOpt) {
    const { id, language } = requestOpt;
    return this.httpS.get(`/sport/${id}`, {}, language);
  }

  fetchCompetitors(requestOpt: any) {
    return this.httpS.get(`/sport/competitors`, requestOpt);
  }

  fetchCompetitorsByids(requestOpt: any) {
    return this.httpS.post(`/sport/competitors`, requestOpt);
  }

  fetchCompetitor(requestOpt: any) {
    return this.httpS.get(`/sport/competitors/${requestOpt.id}`, {}, requestOpt.language);
  }

  fetchTournaments(requestOpt: any) {
    return this.httpS.get(`/sport/tournaments`, requestOpt);
  }

  fetchTournamentsByids(requestOpt: any) {
    return this.httpS.post(`/sport/tournaments`, requestOpt);
  }

}

export { SportBasicService };
