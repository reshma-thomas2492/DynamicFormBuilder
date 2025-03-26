import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private formData = new BehaviorSubject<any>(null);
  currentForm = this.formData.asObservable();

  constructor(private http: HttpClient) {


  }

  changeFormData(data: any) {
    this.formData.next(data);
  }

  private formControlsUrl = "http://localhost:3000/form-controls";
  private formsTemplatesUrl = "http://localhost:3000/form-templates";
  private formsListUrl = "http://localhost:3000/form-list";

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
