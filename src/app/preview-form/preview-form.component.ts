import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from "@angular/common";
import { AppService } from '../app.service';
import {  Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent {
  @Input()
  isReadOnly = false;
  @Output()
  closeModal = new EventEmitter();
  dynamicForm!: FormGroup;
  constructor(
    private router: Router,
    private location: Location,
    private service: AppService,
    private fb: FormBuilder) { }

  @Input()
  form!: any;

  ngOnInit() {

    let formGroup: any = {};

    this.form.formControls.forEach((control: any) => {

      formGroup[control.name] = [control.value || '', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(3)]];

    });
    this.dynamicForm = this.fb.group(formGroup);
    this.isReadOnly ? this.dynamicForm.disable() : null;



  }


  back() {
    this.location.back();
  }

  save() {
    let date = new Date();
    let form = {
      id: this.form.formName,
      data: this.dynamicForm.value,
      createdOn: date.toLocaleString()
    }
    this.service.addForm(form).subscribe((data: any) => console.log(data));
    this.closeModal.emit();
    this.router.navigate(['/forms']);
  }
}
