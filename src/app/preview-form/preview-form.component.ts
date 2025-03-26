import { Component, Input } from '@angular/core';
import { Location } from "@angular/common";
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent {
  dynamicForm!: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: AppService,
    private fb: FormBuilder) { }

    @Input()
    form!:any;

  ngOnInit() {

    this.service.formListJSON.subscribe((data: any) => {
      let formGroup: any = {};

      this.form.formControls.forEach((control: any) => {
        formGroup[control.name] = [control.value || '',[ Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3)]];
        
      });
      this.dynamicForm = this.fb.group(formGroup);

    })

  }

  back() {
    this.location.back();
  }
}
