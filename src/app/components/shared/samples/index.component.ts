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

@Component({
  selector: 'app-resume-sample-04',
  templateUrl: './sample-04.component.html',
  styleUrls: ['./sample-04.scss']
})
export class Sample04Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'app-resume-sample-05',
  templateUrl: './sample-05.component.html',
  styleUrls: ['./sample-05.scss']
})
export class Sample05Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'app-resume-sample-06',
  templateUrl: './sample-06.component.html',
  styleUrls: ['./sample-06.scss']
})
export class Sample06Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }
}


@Component({
  selector: 'app-resume-sample-07',
  templateUrl: './sample-07.component.html',
  styleUrls: ['./sample-07.scss']
})
export class Sample07Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'app-resume-sample-08',
  templateUrl: './sample-08.component.html',
  styleUrls: ['./sample-08.scss']
})
export class Sample08Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }
}

@Component({
  selector: 'app-resume-sample-09',
  templateUrl: './sample-09.component.html',
  styleUrls: ['./sample-09.scss']
})
export class Sample09Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }

  formatDp(name, i = 1) {
    if (i === 1) {
      if (!name) { return 'N' }
      return name[0]
    } else {
      if (!name) { return 'A' }
      const [first, last] = name.split(' ');
      if (!last) { return first[1] }
      return `${last[0]}`;
    }
  }
}

@Component({
  selector: 'app-resume-sample-10',
  templateUrl: './sample-10.component.html',
  styleUrls: ['./sample-10.scss']
})
export class Sample10Component extends SampleBaseComponent implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {
  }
}