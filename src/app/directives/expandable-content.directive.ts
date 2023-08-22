import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[expandable-content-host]',
})
export class ExpandableContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { 
    // console.log('ExpandableContentDirective.constructor');
  }
}
