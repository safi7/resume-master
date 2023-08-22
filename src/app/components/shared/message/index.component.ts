import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { delay, tap } from 'rxjs/operators';

import { MessageService } from '@services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './index.component.html',
  styleUrls: ['./message.scss']
})
export default class MessageComponent implements OnInit, OnChanges {
  // tslint:disable-next-line: no-input-rename
  @Input('channel') channel: String; // specify channel when it is private

  envelop = {
    channel: 'public',
    message: '',
    type: 'error',
    title: 'Oh no!'
  };

  constructor(private messageS: MessageService) {
    this.channel = 'public'; // default channel
  }

  ngOnInit() {
    this.messageS.currentEnvelop.pipe(
      delay(0),
      tap((envelop) => {
        if (envelop.channel !== this.channel) {
          return;
        }
        this.envelop = envelop;
      })
    ).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('channel' in changes) {
      // console.log('__ngOnChanges', changes.channel.currentValue);
    }
  }
}

export { MessageComponent };
