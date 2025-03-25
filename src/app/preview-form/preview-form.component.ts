import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.scss']
})
export class PreviewFormComponent {
  formName!: string;
  dynamicForm!: FormGroup;
  form!: any;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: AppService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.formName = params['name'];
    });

    this.service.currentForm.subscribe((data: any) => {
      this.form = data;

      let formGroup: any = {};
      this.form.formControls.forEach((control: any) => {
        formGroup[control.name] = [control.value || ''];
      });
      this.dynamicForm = this.fb.group(formGroup);

    })

  }

  back() {
    this.location.back();
  }
}
