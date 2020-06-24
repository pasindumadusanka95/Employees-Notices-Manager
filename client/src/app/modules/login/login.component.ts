import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../core/services/authentication.service';
import {first} from 'rxjs/operators';

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
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  get userFormControl() {
    return this.form.get('username');
  }

  get passwordFormControl() {
    return this.form.get('password');
  }

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService) {

    if (this.authenticationService.userValue) {
      this.router.navigate(['/main']);
    }
  }

  ngOnInit(): void {

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/main';
  }

  get formData() {
    return this.form.controls;
  }

  submit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.formData.username.value, this.formData.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }
}
