import { ErrorHandler, Injectable, Injector } from '@angular/core';
import MessageService from '@services/message.service';

@Injectable()
export class ErrorGlobalHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  handleError(error: ErrorEvent) {
    const messageS = this.injector.get(MessageService);

    messageS.updateEnvelop(error.message);

    throw error;
  }
}
