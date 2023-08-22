import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input, ElementRef, OnDestroy } from '@angular/core';
import { PopupContentDirective } from 'src/app/directives/popup-content.directive';
import { IPopupableComponent } from 'src/app/interfaces/popupable.component';

@Component({
  selector: 'app-simple-modal',
  templateUrl: './simple-modal.component.html',
  styleUrls: [
    './simple-modal.scss',
  ]
})

export default class SimpleModalComponent implements OnInit, OnDestroy {
  @ViewChild('elModal', { static: true }) elModal: ElementRef;
  @ViewChild(PopupContentDirective) popupContentHost: PopupContentDirective;
  @Input() id = 'simpleModal';

  childComponent;
  childInstance: IPopupableComponent;
  title: any;
  observer: MutationObserver;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.observer = new MutationObserver(mutations => {
      // if aria-hidden then clear viewContainter
      const ariaHidden = mutations.find(v => v.attributeName === 'aria-hidden');
      if (!ariaHidden) { return false; }
      const target = ariaHidden.target as any;
      if (target?.ariaHidden === 'true') {
        this.popupContentHost.viewContainerRef.clear();
      }
    });

    this.observer.observe(this.elModal.nativeElement, { attributes: true });
  }

  ngOnDestroy(): void {
    this.observer && this.observer.disconnect();
  }

  loadComponent(props) {
    if (!props.component) {
      throw new Error('No child component');
    }

    this.childComponent = props.component;
    if (!props.title) {
      this.title = 'NO TITLE';
    } else {
      this.title = props.title;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponent);

    const viewContainerRef = this.popupContentHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.childInstance = <IPopupableComponent>componentRef.instance;
    this.childInstance.onParentClose = () => {
      this.close();
      props.fnclose();
    };
    this.childInstance.onSuccess = props.fnsuccess;
    // this.childInstance.onParentClose = props.fnclose;

    if (props.parameters) {
      this.childInstance.loadParameters(props.parameters);
    }
  }

  close() {
    this.childInstance.onChildClose();
    this.popupContentHost.viewContainerRef.clear();
  }
}

export { SimpleModalComponent };
