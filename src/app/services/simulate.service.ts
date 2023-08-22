import { BaseHttpService } from '@services/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export default class SimulateService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  sget(data, msdelay = 1) {
    return of(data).pipe(delay(msdelay));
  }

  sgetOdds(requestOpt, msdelay = 1) {
    const { group_id: groupId, match_id: matchId, expression } = requestOpt;
    const multiple = 0.2 * +groupId;

    const data = [
      [
        { market_id: 1003, value: [['', 2.02 * multiple], ['0-0.5', 1.90 * multiple]] },
        { market_id: 1005, value: [['2.0', 1.77 * multiple], ['1.5-2', 1.8 * multiple]] },
        { market_id: 1001, value: [3.70 * multiple, 2.19 * multiple, 2.80 * multiple] }
      ],
      [
        { market_id: 1003, value: [['', 2.02 * multiple], ['0-0.5', 1.90 * multiple]] },
        { market_id: 1005, value: [['2.0', 1.77 * multiple], ['1.5-2', 1.8 * multiple]] },
      ]
    ];

    const response = { data };

    return of(response).pipe(delay(msdelay));
  }
}

export { SimulateService };
