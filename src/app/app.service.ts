import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) {
  }

  private userRole = new BehaviorSubject('');

  setUserRole(role: any) {
    this.userRole.next(role);
  }

  getUserRole() {
    return this.userRole.asObservable();
  }

  private userRolesUrl = "http://localhost:3000/user-roles";
  private formControlsUrl = "http://localhost:3000/form-controls";
  private formsTemplatesUrl = "http://localhost:3000/form-templates";
  private formsListUrl = "http://localhost:3000/form-list";

  get userRoles(): Observable<any> {
    return this.http.get(this.userRolesUrl)
  }

  get formControlsJSON(): Observable<any> {
    return this.http.get(this.formControlsUrl)
  }

  get formTemplatesJSON(): Observable<any> {
    return this.http.get(this.formsTemplatesUrl)
  }

  get formsListJSON(): Observable<any> {
    return this.http.get(this.formsListUrl)
  }

  addFormTemplate(form: any): Observable<any> {
    return this.http.post(this.formsTemplatesUrl, form)
  }

  updateFormTemplate(form: any, id: string): Observable<any> {
    let url = this.formsTemplatesUrl + '/' + id;
    return this.http.put(url, form)
  }

  addForm(form: any): Observable<any> {
    return this.http.post(this.formsListUrl, form)
  }

}
