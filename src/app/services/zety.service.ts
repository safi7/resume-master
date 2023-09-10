import { HttpService } from '@services/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class ZetyService {
  constructor(
    private httpS: HttpService
  ) { }


  getSkills(requestOpt: any) {
    return this.httpS.get(`/content/texttunercontent`, requestOpt);
  }
}

export { ZetyService };
