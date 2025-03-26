import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  formsList: any;
  showCreateModal: boolean = false;
  showError: boolean = false;
  showPreview: boolean = false;
  previewForm:any;
  constructor(private router: Router, private service: AppService) {
  }

  ngOnInit() {
    this.service.formListJSON.subscribe((data: any) => {
      this.formsList = data;
    })
  }

  createForm(value: string) {
    if (!value || value == '')
      this.showError = true;
    else {
      this.showError = false;
      this.showCreateModal = false;
      this.service.addForm({
        "formName": value,
        "formControls": []
      }).subscribe((data: any) => {
        this.router.navigate(['/edit', data.id])
      }
      );
    }

  }
  openFormViewer(form: any) {
    this.showPreview = true;
    this.previewForm=form;
  }
  editForm(form: any) {
    this.router.navigate(['/edit', form.id])
  }
}
