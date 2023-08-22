import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseHttpService } from '@services/base-http.service';

@Injectable({ providedIn: 'root' })
export default class RoleService extends BaseHttpService {
  constructor(http: HttpClient) {
    super(http);
  }

  getList() {
    return this.get(`/permissions/roles`);
  }
}

export { RoleService };
