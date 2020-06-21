import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  get userFormControl() { return this.form.get('username'); }
  get passwordFormControl() { return this.form.get('password'); }
  constructor() { }

  ngOnInit(): void {
  }

  submit(){

  }
}
