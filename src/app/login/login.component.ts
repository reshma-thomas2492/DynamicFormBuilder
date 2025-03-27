import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm!: FormGroup;
  userRoles: any[] = [];

  constructor(private router: Router, private service: AppService) {

  }
  ngOnInit() {

    this.service.userRoles.subscribe((data: any) => {
      this.userRoles = data;
    })
    this.loginForm = new FormGroup({
      role: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])

    })
  }
  submit(role: any) {
    if (this.loginForm.valid) {
      this.router.navigate(['/templates'])
    }
    console.log(role)
    //Set current user role
    this.service.setUserRole(role == 'true' ? true : false)
  }

}
