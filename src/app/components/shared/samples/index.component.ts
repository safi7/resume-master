import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { delay, tap } from 'rxjs/operators';
import SampleBaseComponent from './base.component';


@Component({
  selector: 'app-resume-sample-01',
  templateUrl: './sample-01.component.html',
  styleUrls: ['./sample-01.scss']
})

export class Sample01Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'app-resume-sample-02',
  templateUrl: './sample-02.component.html',
  styleUrls: ['./sample-02.scss']
})
export class Sample02Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'app-resume-sample-03',
  templateUrl: './sample-03.component.html',
  styleUrls: ['./sample-03.scss']
})
export class Sample03Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
    this.margin = [0, 0, 45, 0];
  }
}
