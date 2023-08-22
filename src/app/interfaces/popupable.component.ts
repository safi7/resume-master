export interface IPopupableComponent {
  onSuccess: Function;
  onChildClose: Function;
  onParentClose: Function;

  loadParameters(parameters);
}
