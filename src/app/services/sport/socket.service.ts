import _ from 'lodash';
import { Injectable, Injector } from '@angular/core';
import { BaseSocketService } from '@services/base-socket.service';
import { SocketMessageService } from '@services/socket-message.service';

@Injectable({ providedIn: 'root' })
export default class SportsSocketService extends BaseSocketService {
  channels = ['match'];
  events = {
    'match': ['change'],
  };

  constructor(socketMessageS: SocketMessageService, injector: Injector) {
    super(socketMessageS, injector);
  }

  // startup & subscribe to rooms
  // = Matches
  latestMatches = subscriptions => {
    return this.get(`/match?id=${Math.random()}`, subscriptions);
  }
  listenMatches = subscriptions => {
    // console.log('LISTENING TO MATCHES');
    return this.subscribe('match', subscriptions, 'match#change');
  }

  // unsubscribe methods
  stop() {
    return this.unsubscribeAll();
  }
}

export { SportsSocketService };
