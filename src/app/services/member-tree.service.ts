import _ from 'lodash';
import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';

@Injectable({ providedIn: 'root' })
export default class MemberTreeService {
  constructor(private httpS: HttpService) { }

  fetchMember(requestOpt: any) {
    return this.httpS.get(`/member-tree/${requestOpt.vendorId}/${requestOpt.userId}`);
  }
}

export { MemberTreeService };
