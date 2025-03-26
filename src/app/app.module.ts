import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MaterialModuleModule } from './material-module/material-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { ErrorComponent } from './error/error.component';
import { HttpClientModule } from '@angular/common/http';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkDropList, CdkDrag} from '@angular/cdk/drag-drop';
import { FormFieldComponent } from './form-field/form-field.component';
import { ModalComponent } from './modal/modal.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormsListComponent } from './forms-list/forms-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    ErrorComponent,
    FormFieldComponent,
    ModalComponent,
    PreviewFormComponent,
    FormBuilderComponent,
    FormsListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    AppRoutingModule,
    HttpClientModule,
    DragDropModule,
    CdkDropList, 
    CdkDrag
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
