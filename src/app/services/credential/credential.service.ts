import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';
import _ from 'lodash';


@Injectable({ providedIn: 'root' })
export default class CredentialService {
  constructor(private httpS: HttpService,
  ) { }


  getCredential(requestOpt = null) {
    return this.httpS.get(`/credential`, requestOpt);
  }

  updateCredential(requestOpt) {
    return this.httpS.put(`/credential`, requestOpt);
  }
}

export { CredentialService };
