import { HttpService } from '@services/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class MainMasterService {
  constructor(
    private httpS: HttpService
  ) { }


  authLogin(requestOpt: any) {
    return this.httpS.post(`/api/auth/login`, requestOpt);
  }

  getResumeCount(requestOpt: any) {
    return this.httpS.get(`/api/resume/generated`, requestOpt);
  }

  generateResume(requestOpt: any) {
    return this.httpS.post(`/api/resume/generate`, requestOpt);
  }
}

export { MainMasterService };
