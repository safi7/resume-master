import { HttpService } from '@services/http.service';
import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({ providedIn: 'root' })
export default class MiscService {
  constructor(private httpS: HttpService) { }

  fetchSystemsStatus(requestOpt: any) {
    return this.httpS.get(`/misc/systems-status`, requestOpt);
  }

  fetchSystemUnix() {
    return this.httpS.get(`/misc/system-unix`);
  }
  
  fetchOnlinePlayer() {
    return this.httpS.get(`/misc/online-player`);
  }
}

export { MiscService };
