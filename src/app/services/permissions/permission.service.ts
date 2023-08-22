import { HttpService } from '@services/http.service';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class PermissionService {
  constructor(private httpS: HttpService) { }

  getList() {
    return this.httpS.get(`/permissions`);
  }

  getOne(requestOpt: any) {
    return this.httpS.get(`/permissions/${requestOpt}`);
  }

  refreshPermissions() {
    return this.httpS.get(`/permissions/refresh`);
  }

  update(requestOpt: any) {
    const data = {
      updates: requestOpt
    };
    return this.httpS.put(`/permissions`, data);
  }

  create(requestOpt: any, channel = 'public') {
    return this.httpS.post(`/permissions`, requestOpt, {}, channel);
  }

  delete(requestOpt: any) {
    return this.httpS.delete(`/permissions/${requestOpt.id}`);
  }

  getListRoles() {
    return this.httpS.get(`/permissions/roles`);
  }

  getRolesPermissions(id) {
    return this.httpS.get(`/permissions/roles/${id}`);
  }

  updateRolesPermissions(requestOpt: any) {
    const data = {
      updates: requestOpt.updates
    };
    return this.httpS.put(`/permissions/roles/${requestOpt.roleId}`, data);
  }

  getUsers(requestOpt) {
    return this.httpS.get(`/users?search=${requestOpt}`);
  }

  getUsersPermissions(id) {
    return this.httpS.get(`/permissions/users/${id}`);
  }

  updateUsersPermissions(requestOpt: any) {
    return this.httpS.put(`/permissions/users/${requestOpt.user}`, requestOpt);
  }
}

export { PermissionService };
