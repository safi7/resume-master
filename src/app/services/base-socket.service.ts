import _ from 'lodash';
import moment from 'moment-timezone';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';
import { environment } from '@env/environment';
import { Injectable, Injector } from '@angular/core';
import { CommonHelper } from '../../app/helpers/common.helper';
import { SocketMessageService } from './socket-message.service';

interface Subscription { hash: string; channel: string; params: any; }

@Injectable({ providedIn: 'root' })
export default class BaseSocketService {
  url = environment.socketHost;
  socket: any;
  subscriptions: Subscription[] = [];
  commonH: CommonHelper;
  subscribers = {};
  events = {};
  channels = [];

  constructor(private socketMessageS: SocketMessageService, private injector: Injector) {
    this.socket = io(this.url, {
      transports: ['websocket']
    });
    this.commonH = injector.get(CommonHelper);

    this.socket.on('connect', () => {
      console.log(`[socket] connect to ${this.url}`);

      for (const subscription of this.subscriptions) {
        const { channel, params } = subscription;
        this.socket.emit('subscribe', channel, params);
      }
    });

    this.checkStatus();
  }

  // get data by passing an array of object
  get(endpoint: string, params: any[]) {
    this.socket.emit('get', endpoint, params);
    // console.log('[socket] request.get()', endpoint, params);
    return new Observable(subscriber => {
      this.socket.on(endpoint, data => {
        subscriber.next(data);
        subscriber.complete();
        this.socketMessageS.updateMessage({
          text: 'Received data.',
          type: 'success',
          timestamp: moment().tz(moment.tz.guess())
        });
      });
    });
  }

  // subscribe to single room by each object
  // mainly for #change event
  subscribe(channel: string, params: any, event = null) {
    // part 1
    params = (Array.isArray(params)) ? params : [params];
    const args = [];
    for (const param of params) {
      const hash = this.hash(channel, param);
      if (this.subscriptions.some(s => s.hash === hash)) {
        continue; // prevent duplicate
      }
      const subscription = { hash, channel, params: param };
      args.push(param);
      this.subscriptions.push(subscription);
    }
    if (args.length) { this.socket.emit('subscribe', channel, args); }

    // part 2, to return observable to listen
    event = event || `${channel}#change`;
    return new Observable(subscriber => {
      this.subscribers[event] = subscriber;
      this.socket.on(event, data => {

        subscriber.next(data);
        this.socketMessageS.updateMessage({
          text: 'Received data.',
          type: 'success',
          timestamp: moment().tz(moment.tz.guess())
        });
      });
    });

  }

  // unsubscribe to single room by each object
  // mainly for #change event
  unsubscribe(channel: string, params: any) {
    let paramsArr = [];

    !Array.isArray(params) ? paramsArr.push(params) : paramsArr = [...paramsArr, ...params];
    for (const p of paramsArr) {
      const hash = this.hash(channel, p);

      let subscription = null;

      if (subscription = this.subscriptions.find(s => s.hash === hash)) {
        _.remove(this.subscriptions, s => s.hash === hash);
        this.removeSubscriber(subscription.channel);
        this.socket.emit('unsubscribe', subscription.channel, subscription.params);
        // console.log('[socket] unsubscribe', subscription);
      }
    }
  }

  // unsubscribe one-time by passing an array of objects
  // mainly for #startup event
  unsubscribes(channel: string, paramsArr: any[]) {
    if (!Array.isArray(paramsArr)) {
      // console.log('[socket] unsubscribe - params need to be an array');
      return;
    }

    this.socket.emit('unsubscribe', channel, paramsArr);
    //  console.log('[socket] unsubscribe>>>>>>>>>', channel);
  }

  // unsubcribe to all subscribed rooms
  // empty out subscriptions and remove rxjs subscriber
  unsubscribeAll() {
    // console.log('[socket] unsubscribeAll', this.subscriptions);

    for (const subscription of this.subscriptions) {
      this.socket.emit('unsubscribe', subscription.channel, subscription.params);
    }

    for (const event of Object.keys(this.subscribers)) {
      if (event in this.subscribers) {
        this.subscribers[event].unsubscribe();
      }
    }

    for (const channel of this.channels) {
      if (channel in this.subscribers) {
        this.subscribers[channel].unsubscribe();
      }
    }

    this.subscribers = {};
    this.subscriptions = [];
  }

  // wrapper for socket.on()
  on(event: string) {
    throw new Error('not-support-now');
    return new Observable(subscriber => {
      this.subscribers[event] = subscriber;
      this.socket.on(event, data => {
        subscriber.next(data);
        switch (true) {
          case event.charAt(0) === '/':
            subscriber.complete();
            break;
        }
        this.socketMessageS.updateMessage({
          text: 'Received data.',
          type: 'success',
          timestamp: moment().tz(moment.tz.guess())
        });
      });
    });
  }

  // remove rxjs subscriber function after unsubscribe
  removeSubscriber(channel: string) {
    if (!(channel in this.events)) { return; }

    const events = this.events[channel];
    for (const event of events) {
      if ((`${channel}#${event}`) in this.subscribers) {
        this.subscribers[`${channel}#${event}`].unsubscribe();
        delete this.subscribers[`${channel}#${event}`];
      }
    }
  }

  // wrapper for socket.emit()
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  // close socket connection
  close() {
    this.socket.close();
  }

  hash(channel, params) {
    const values = { ...params, channel };
    return this.commonH.objectHash(values);
  }

  // check socket status for message
  checkStatus() {
    this.socket.on('connect', () => {
      this.socketMessageS.updateMessage({
        text: 'socket is connected.',
        type: 'success'
      });
      console.log(`[socket] on.connect 👌`);
    });

    this.socket.on('disconnect', () => {
      this.socketMessageS.updateMessage({
        text: 'socket is disconnected.',
        type: 'error'
      });
      console.log(`[socket] on.disconnect 👌`);
    });

    this.socket.on('reconnecting', () => {
      this.socketMessageS.updateMessage({
        text: 'socket tries reconnect...',
        type: 'warning'
      });
      console.log(`[socket] on.reconnecting 👌`);
    });
  }
}

export { BaseSocketService };
