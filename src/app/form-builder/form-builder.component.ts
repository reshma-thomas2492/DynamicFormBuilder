import { Component } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";
import { AppService } from '../app.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent {

  controls: any[] = [];
  droppedFields: any[] = [];
  formId: string = '';
  showCustomElement: boolean = false;
  dynamicForm: any;
  customElement: any;
  customElementIndex = -1;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private service: AppService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.formId = params['id'];
    });
    this.service.formControlsJSON.subscribe((data: any) => {
      this.controls = data;
    })
    this.service.formListJSON.subscribe((data: any) => {
      this.dynamicForm = data.filter((form: any) => form.id == this.formId)[0];
    });

  }

  back() {
    this.location.back();
  }
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  reset() {
    this.dynamicForm.formControls = [];
  }

  saveForm() {
    this.service.updateForm(this.dynamicForm, this.dynamicForm.id).subscribe((data: any) => console.log(data));
    this.back();
  }

  openCustomElement(control: any, index: number) {
    this.customElement = JSON.parse(JSON.stringify(control));
    this.showCustomElement = true;
    this.customElementIndex = index;
  }

  removeElement(control: any, index: number) {
    this.dynamicForm.formControls.splice(index, 1)
  }

  updateElement() {
    this.showCustomElement = false;
    this.dynamicForm.formControls[this.customElementIndex] = this.customElement;
  }
}
