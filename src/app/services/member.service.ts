import { HttpService } from '@services/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class MemberService {
  constructor(
    private httpS: HttpService
  ) { }


  fetchMember(requestOpt: any) {
    return this.httpS.get(`/member`, requestOpt);
  }
}

export { MemberService };
