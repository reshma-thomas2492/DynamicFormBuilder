import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from "@angular/common";
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  errorMsg: string = '';
  submitted: boolean = false;

  @Input()
  form!: any;

  ngOnInit() {

    let formGroup: any = {};

    this.form.formControls.forEach((control: any) => {

      // formGroup[control.name] = [control.value || '', [Validators.required,
      // Validators.minLength(3),
      // Validators.maxLength(3)]];

      let validators: any = [];
      if (control.validations.required)
        validators.push(Validators.required);
      if (control.validations.maxLength)
        validators.push(Validators.maxLength(control.validations.maxLength));

      if (control.type != "checkbox") {
        formGroup[control.name] = [control.value || '', validators];
      }
      else {
        let formArray: any = [];
        control.items.forEach((item: any) => {
          let formArrayGroup: any = {};
          formArrayGroup[item.name] = [item.value || ''];
          formArray.push(this.fb.group(formArrayGroup));

        })
        formGroup[control.name] = this.fb.array(formArray);
      }

    });
    this.dynamicForm = this.fb.group(formGroup);
    this.isReadOnly ? this.dynamicForm.disable() : null;
  }


  back() {
    this.location.back();
  }

  save() {
    this.submitted = true;
    if (this.dynamicForm.valid) {
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

  get getControls() {
    let c: FormGroup = this.dynamicForm;
    return this.dynamicForm.controls;
  }


  isValid(control: any) {
    let errors = this.dynamicForm.get(control.name)?.errors;
    console.log(errors);
    if (errors) {
      if (errors["required"])
        this.errorMsg = control.name + " is required"
      if (errors["maxlength"])
        this.errorMsg = "Max length should be " + errors["maxlength"].requiredLength;
    
    }
    else {
      this.errorMsg = '';
    }
    return this.errorMsg;
  }
}
