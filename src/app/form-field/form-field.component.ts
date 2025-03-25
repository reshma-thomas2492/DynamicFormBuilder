import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss']
})
export class FormFieldComponent {

  @Input()
  field!: any;

  @Output()
  openCustomElement = new EventEmitter();
  @Output()
  removeElement = new EventEmitter();

}
