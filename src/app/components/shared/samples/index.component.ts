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
