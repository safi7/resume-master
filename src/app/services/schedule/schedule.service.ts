import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import _ from 'lodash';
@Injectable({ providedIn: 'root' })
export default class ScheduleService {
  constructor(private httpS: HttpService) { }


  fetchSchedule(requestOpt = {}) {
    return this.httpS.get(`/schedule`, requestOpt);
  }

  fetchFixtures(requestOpt = {}) {
    return this.httpS.get(`/schedule/fixtures`, requestOpt);
  }

  fetchFixture(requestOpt: any) {
    const match_id = requestOpt?.match_id;
    return this.httpS.get(`/schedule/fixtures/${match_id}`);
  }

  fetchOnlyMatchesByIds(requestOpt: any) {
    return this.httpS.post(`/schedule/fixtures-ids`, requestOpt);
  }

  fetchMatchLog(requestOpt: any) {
    return this.httpS.get(`/schedule/fixture/${requestOpt.id}/log`);
  }
}

export { ScheduleService };
