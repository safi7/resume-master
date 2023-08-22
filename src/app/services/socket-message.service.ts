import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class SocketMessageService {
  message = { text: '', type: '', timestamp: '' };
  messageSource = new BehaviorSubject(this.message);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  updateMessage(message) {
    this.message = message;

    this.messageSource.next(message);
  }
}

export { SocketMessageService };

