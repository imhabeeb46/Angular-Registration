import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  user: any;
  loginForm: FormGroup;

  // CONSTANTS
  LOGIN_PASSWORD_FAIL_MSG = 'Invalid Password';
  LOGIN_CRED_FAIL_MSG = 'Invalid Username or Password';
  SNACKBAR_CLOSE = 'Close';

  constructor(
      private router: Router,
      private formBuilder: FormBuilder,
      private AuthService: AuthorizationService
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
    });
  }

  login(info) {
    if (this.loginForm.valid) {
      if (!this.AuthService.isUserExistForLogin(info)) {
        this.AuthService.openSnackBar(this.LOGIN_CRED_FAIL_MSG, this.SNACKBAR_CLOSE);
      } else {
        this.AuthService.isCredentialsMatch(info) ?
        this.loginSuccess() :
        this.AuthService.openSnackBar(this.LOGIN_PASSWORD_FAIL_MSG, this.SNACKBAR_CLOSE);
      }
    }
  }

  loginSuccess() {
    this.AuthService.loginSuccessful();
    this.router.navigateByUrl('/home');
  }

}
