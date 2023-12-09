import { Component } from '@angular/core';
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
  }

  runClock() {
  }
}
