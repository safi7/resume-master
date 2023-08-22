export interface IExpandableComponent {
  onSuccess: Function;
  onChildClose: Function;
  onParentClose: Function;

  loadParameters(parameters, callbacks);
}
