import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidation } from './../../services/validator';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signupForm: FormGroup;
  alert = 'This field is required';
  reg = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  // CONSTANTS
  USER_ALREADY_EXIST = 'User with same Email ID or Username already exist';
  SIGNUP_SUCCESS = 'Welcome';
  SNACKBAR_CLOSE = 'Close';

  constructor(
      private AuthService: AuthorizationService,
      private formBuilder: FormBuilder,
      private router: Router
    ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      email: [null, [Validators.required, Validators.email]],
      displayName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      firstName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      lastName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      nickName: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      website: [null, [Validators.required, Validators.pattern(this.reg)]],
      jabber: [null, [Validators.required]],
      aolIm: [null, [Validators.required]],
      yahooIm: [null, [Validators.required]],
      bio: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]],
      confirmPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/)]]
    },
    {
      validator: PasswordValidation.MatchPassword
    });
  }

  get controls() {
    return this.signupForm.controls;
  }

  submit(userData) {
    if (this.AuthService.isUserExist(userData)) {
      this.AuthService.openSnackBar(this.USER_ALREADY_EXIST, this.SNACKBAR_CLOSE);
      return null;
    }
    this.AuthService.signupSuccessful(userData);
    this.AuthService.openSnackBar(this.SIGNUP_SUCCESS, this.SNACKBAR_CLOSE); // openSnackBar should be in helpers intead of service
    this.router.navigateByUrl('/home');
  }

}
