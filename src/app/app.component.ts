import { Component } from '@angular/core';
import moment from 'moment-timezone';
import { interval, Subscription } from 'rxjs';
import PermissionService from '@services/permissions/permission.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  clockS: Subscription;
  constructor(
    private permissionS: PermissionService,
  ) {
    moment.tz.setDefault('UTC');
    moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';

    const clock = interval(60000);
    this.clockS = clock.subscribe(v => { this.runClock(); });
  }

  runClock() {
    const tocken = localStorage.getItem('jwt_token');
    if (tocken) {
      // console.log('WARN => refresh permission turned off due to api not ready')
      this.permissionS.refreshPermissions().subscribe(res => {
        const { permissions } = res.data;
        localStorage.setItem('permissions', JSON.stringify(permissions));
      });
    }
  }
}
