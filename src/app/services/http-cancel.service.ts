import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HttpCancelService {

  private pendingHTTPRequests$ = new Subject<void>();

  constructor() { }

  // Cancel Pending HTTP calls
  public cancelPendingRequests() {
    console.log(' this.pendingHTTPRequests$', this.pendingHTTPRequests$);
    this.pendingHTTPRequests$.next();
  }

  public onCancelPendingRequests() {
    return this.pendingHTTPRequests$.asObservable();
  }

}