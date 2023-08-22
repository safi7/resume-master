import { Component, OnInit, ViewChild, ComponentFactoryResolver, Input } from '@angular/core';
import { ExpandableContentDirective } from 'src/app/directives/expandable-content.directive';
import { IExpandableComponent } from 'src/app/interfaces/expandable.component';

@Component({
  selector: 'app-simple-panel',
  templateUrl: './simple-panel.component.html',
  styleUrls: [
    './simple-panel.scss',
  ]
})

export default class SimplePanelComponent implements OnInit {
  @ViewChild(ExpandableContentDirective) expandableContentHost: ExpandableContentDirective;
  @Input() id = 'simplePanel';

  childComponent;
  childInstance: IExpandableComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() { }

  loadComponent(props) {
    if (!props.component) {
      throw new Error('No child component');
    }

    this.childComponent = props.component;
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.childComponent);

    const viewContainerRef = this.expandableContentHost.viewContainerRef;

    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    this.childInstance = <IExpandableComponent>componentRef.instance;
    this.childInstance.onParentClose = () => {
      this.close();
      props.fnclose();
    };
    this.childInstance.onSuccess = props.fnsuccess;
    // this.childInstance.onParentClose = props.fnclose;

    props.callbacks.toggleSlider = this.toggleSlider.bind(this);

    if (props.parameters && props.callbacks) {
      this.childInstance.loadParameters(props.parameters, props.callbacks);
    } else if (props.parameters) {
      this.childInstance.loadParameters(props.parameters, null);
    }

  }

  close() {
    this.childInstance.onChildClose();
  }

  toggleSlider() {
    var menu = document.querySelector('.content') // Using a class instead, see note below.
    var right_panel = document.querySelector('.right-panel')
    menu.classList.toggle('display');
    right_panel.classList.toggle('slide-left')

    return menu.classList.contains('display');
  }
}

export { SimplePanelComponent };
