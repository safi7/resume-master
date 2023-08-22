import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class MessageService {
  def = {
    channel: 'public',
    message: '',
    type: 'error',
    title: '',
  };

  private envelopSource = new BehaviorSubject(this.def);

  currentEnvelop = this.envelopSource.asObservable();

  constructor() { }

  updateEnvelop(envelop) {
    if (typeof envelop === 'string') {
      envelop = { ...this.def, ...{ message: envelop } };
    }

    envelop = { ...this.def, ...envelop };

    if (!envelop.title) {
      envelop.title = (type => {
        switch (type) {
          case 'success': return 'Success';
          case 'info': return 'Did you know?';
          case 'error': return 'Oh no!';
        }
      })(envelop.type);
    }

    console.log('📧 envelop.blast', envelop);
    this.envelopSource.next(envelop);
  }

  restart(channel = 'public') {
    this.def.channel = channel;
    this.envelopSource.next(this.def);
  }
}

export { MessageService };
