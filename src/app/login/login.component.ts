import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  loginForm!:FormGroup;

  constructor(private router:Router){

  }
  ngOnInit(){
    this.loginForm = new FormGroup({
      role : new FormControl('admin',[  Validators.required ]),
      password : new FormControl(null,[  Validators.required ])

    })
  }
    submit(){
    if(this.loginForm.valid){
      this.router.navigate(['/list'])
    }
 
    }
  
}
