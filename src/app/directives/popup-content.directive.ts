import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[popup-content-host]',
})
export class PopupContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { 
    // console.log('PopupContentDirective.constructor');
  }
}
