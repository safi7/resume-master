import _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export default class MapperService {
  constructor(private httpS: HttpService) { }

  fetchSports() {
    return this.httpS.get(`/providers/mapper/sports`);
  }

  fetchMatches(requestOpt: any) {
    requestOpt = {
      ...this.httpS.defaultDateRange(),
      ...requestOpt
    };

    const qs = this.httpS.queryString(
      _.pick(requestOpt, ['sport_id', 'from', 'to']));

    return this.httpS.get(`/providers/mapper/matches?${qs}`);
  }

  fetchUngroupedMatchCount() {
    return this.httpS.get(`/providers/mapper/ungrouped-match/count`);
  }

  fetchMapInfo(requestOpt: any) {
    return this.httpS.post(`/providers/mapper/map-info`, requestOpt);
  }

  fetchMatchesMap(requestOpt: any) {
    return this.httpS.post(`/providers/mapper/matches-map`, requestOpt);
  }

  mapMatch(requestOpt: any) {
    return this.httpS.post(`/providers/mapper/map-match`, requestOpt);
  }

  ungroupMatch(requestOpt: any) {
    return this.httpS.post(`/providers/mapper/ungroup-match`, requestOpt);
  }

  ungroupProvider(requestOpt: any) {
    return this.httpS.post(`/providers/mapper/ungroup-provider`, requestOpt);
  }

  ignoreProviderMatch(requestOpt: any) {
    return this.httpS.post(`/providers/mapper/ignore-match`, requestOpt);
  }

  fetchOutrightSubjects(requestOpt: any) {
    const headers = {
      'X-provider': requestOpt.provider
    };

    return this.httpS.get(`/providers/mapper/outrights`, {}, headers);
  }

  mapOutright(requestOpt: any) {
    const headers = {
      'X-provider': requestOpt.provider
    };

    const payload = _.pick(requestOpt, ['subject_id', 'odds_id', 'market_id', 'description']);
    return this.httpS.post(`/providers/mapper/map-outright`, payload, headers);
  }
}

export { MapperService };
