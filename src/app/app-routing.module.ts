import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { ErrorComponent } from './error/error.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { FormsListComponent } from './forms-list/forms-list.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'templates', component: ListComponent },
  { path: 'forms', component: FormsListComponent },
  { path: 'edit/:id', component: FormBuilderComponent },
  { path: '**', component: ErrorComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
