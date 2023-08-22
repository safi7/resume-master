import { HttpService } from '@services/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class AuthService {
  constructor(
    private httpS: HttpService
  ) { }


  getApiVersion(apiBaseurl) {
    return this.httpS.get(`/version`, {}, {}, 'public', apiBaseurl);
  }

  register(payload: any, channel = 'public') {
    return this.httpS.post(`/auth/register`, payload, {}, channel);
  }

  login(payload: any, channel = 'public') {
    return this.httpS.post(`/auth/login`, payload);
  }

  logout() {
    // console.log('logout. remove jwt token.');
    localStorage.removeItem('vendor_id');
    localStorage.removeItem('username');
    localStorage.removeItem('vendor_name');
    localStorage.removeItem('packages');
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('permissions');
    localStorage.removeItem('user_setting');
  }

  changePassword(payload: any, channel = 'public') {
    return this.httpS.put(`/auth/change-password`, payload, {}, channel);
  }

  resetPassword(payload: any, channel = 'public') {
    return this.httpS.put(`/auth/reset-password`, payload, {}, channel);
  }

  getUrlLanding(vendor_id: any, channel = 'public') {
    return this.httpS.get(`/auth/url-landing/${vendor_id}`, {}, {}, channel);
  }

  getSettings(vendor_id: any, channel = 'public') {
    return this.httpS.get(`/auth/setting`, {}, {}, channel);
  }

  updatesettings(requestOpt) {
    return this.httpS.put(`/auth/setting`, requestOpt);
  }
}

export { AuthService };
