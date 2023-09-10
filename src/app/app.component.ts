import { Component } from '@angular/core';
import moment from 'moment-timezone';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  clockS: Subscription;
  constructor(
  ) {
    moment.tz.setDefault('UTC');
    moment.defaultFormat = 'YYYY-MM-DD HH:mm:ss';
  }

  runClock() {
  }
}
