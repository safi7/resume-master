import { HttpService } from '@services/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class VendorMemberService {
  constructor(
    private httpS: HttpService
  ) { }


  login(webType) {
    return this.httpS.post(`/vendor-member/login`, { web_type: webType });
  }
}

export { VendorMemberService };
