import { startWith, filter } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import moment from 'moment-timezone';
import { outcomes } from '@configs/outcomes';

@Injectable({ providedIn: 'root' })
export default class CommonHelper {
  constructor() { }

  objectHash(obj, separator = ':') {
    return Object.keys(obj)
      .sort()
      .map(v => obj[v])
      .join(separator);
  }

  dateRanges(start, end) {
    const dates = [];
    start = moment(start).clone();
    end = moment(end).clone();

    while (start.isSameOrBefore(end)) {
      dates.push(start.clone());
      start.add(1, 'day');
    }

    return dates;
  }

  marketOutcomes(market_type_id) {
    return outcomes.filter(v => +v.market_type_id === +market_type_id);
  }

  authorize(requirep) {
    const userp = JSON.parse(localStorage.getItem('permissions')).map(v => v.name);
    if (!requirep) { return true; }
    return userp.filter(p2 => requirep.startsWith(p2)).length
  }
}

export { CommonHelper };
