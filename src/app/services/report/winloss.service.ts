import _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';

@Injectable({ providedIn: 'root' })
export default class ReportsWinLossService {
  constructor(private httpS: HttpService) { }

  fetchWinlossReportD1(requestOpt = {}) {
    return this.httpS.get(`/reports/winloss/d1`, requestOpt);
  }

  fetchWinlossReportD2(requestOpt = {}) {
    return this.httpS.get(`/reports/winloss/d2`, requestOpt);
  }

  exportReports(requestOpt = {}) {
    return this.httpS.get(`/reports/winloss/export`, requestOpt);
  }

  refreshCalculation(requestOpt = {}) {
    return this.httpS.get(`/reports/winloss/refresh-calculation`, requestOpt);
  }

  reCalculationReport(requestOpt = {}) {
    return this.httpS.put(`/reports/winloss/recalculation-report`, requestOpt);
  }

}

export { ReportsWinLossService };
