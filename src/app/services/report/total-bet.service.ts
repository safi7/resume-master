import _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';

@Injectable({ providedIn: 'root' })
export default class ReportTotalBetService {
  constructor(private httpS: HttpService) { }

  fetchReport(requestOpt = {}) {
    return this.httpS.get(`/reports/total-bet`, requestOpt);
  }

  refreshCalculation(requestOpt = {}){
    return this.httpS.get(`/reports/total-bet/refresh-calculation`, requestOpt);
  }
}

export { ReportTotalBetService };
