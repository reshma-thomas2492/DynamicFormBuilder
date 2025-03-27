import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  formsList: any;
  showCreateModal: boolean = false;
  showError: boolean = false;
  showFormSubmit: boolean = false;
  formSubmit: any;
  isAdmin = false;
  subscription!: Subscription;
  constructor(private router: Router, private service: AppService) {
  }

  ngOnInit() {
    this.subscription = this.service.getUserRole().subscribe((data: any) => {
      this.isAdmin = data;
    })
    this.service.formTemplatesJSON.subscribe((data: any) => {
      this.formsList = data;
    })

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  createForm(value: string) {
    if (!value || value == '')
      this.showError = true;
    else {
      this.showError = false;
      this.showCreateModal = false;
      this.service.addFormTemplate({
        "formName": value,
        "formControls": []
      }).subscribe((data: any) => {
        this.router.navigate(['/edit', data.id])
      }
      );
    }

  }
  openFormList() {
    this.router.navigate(['/forms'])
  }

  openFormViewer(form: any) {
    this.showFormSubmit = true;
    this.formSubmit = form;
  }

  editForm(form: any) {
    this.router.navigate(['/edit', form.id])
  }
}
