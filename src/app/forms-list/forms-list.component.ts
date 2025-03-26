import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-forms-list',
  templateUrl: './forms-list.component.html',
  styleUrls: ['./forms-list.component.scss']
})
export class FormsListComponent {

  formsList!: any;
  data!:any;
  constructor(private router: Router, private service: AppService) {
  }

  ngOnInit() {
    this.service.formsListJSON.subscribe((data: any) => {
      this.formsList = data;
    })
  }

  openTemplatesList() {
    this.router.navigate(['/templates'])
  }

  showFormData(form:any){
    this.data=JSON.stringify(form.data);
  }
}
