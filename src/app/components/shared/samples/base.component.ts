import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-resume-sample-base',
  template: '<div>Base Samples</div>',
})
export default class SampleBaseComponent implements OnInit {

  show = 0;

  constructor() {
  }

  ngOnInit() {
  }


  receive(data) {
    console.log('receive', data);
  }

}

export { SampleBaseComponent };
