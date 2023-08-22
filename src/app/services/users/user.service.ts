import { Injectable } from '@angular/core';
import { HttpService } from '@services/http.service';

@Injectable({ providedIn: 'root' })
export default class UserService {
  constructor(private httpS: HttpService) { }

  getUserList() {
    return this.httpS.get(`/users`);
  }

  getUserAll() {
    return this.httpS.get(`/users/all`);
  }

  getUsersByid(payload) {
    return this.httpS.get(`/users?users=${payload}`);
  }

  getUsersByids(payload) {
    return this.httpS.post(`/users`, payload);
  }

  getUser(payload: any, channel = 'public') {
    return this.httpS.get(`/users/${payload.id}`, payload, {}, channel);
  }

  updateUser(payload: any, channel = 'public') {
    return this.httpS.put(`/users/${payload.vendor_user_id}`, payload, {}, channel);
  }

  sendMessageTelebot(payload: any) {
    return this.httpS.post(`/telebot/send`, payload, {});
  }

  unbindTelegram(payload: any) {
    return this.httpS.post(`/telebot/unbind`, payload, {});
  }

  updateSubscription(payload: any) {
    return this.httpS.post(`/telebot/subscription/update`, payload, {});
  }

  getSubscription(payload: any, channel = 'public') {
    return this.httpS.get(`/telebot/subscription/${payload.id}`, payload, {}, channel);
  }
}

export { UserService };
