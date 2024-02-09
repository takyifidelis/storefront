import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
// import { Subscription } from 'rxjs';
// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { GoogleLoginProvider, GoogleSigninButtonDirective, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-signup-customer',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupCustomerComponent {
  mailIcon = faEnvelope;
  passwordLock = faLock;
  eyeIcon = faEyeSlash;
  ol = faCircle;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  user: SocialUser | undefined;

  // Email and Password Validation Below

  constructor(private authService: SocialAuthService) {}

  // Email Validation
  // Password Validation

  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  firstName: string = '';
  isValid: boolean = false;
  isMinTenChar: boolean = false;
  isMinOneNum: boolean = false;
  isMinOneUppercase: boolean = false;
  isMinOneLowercase: boolean = false;
  passwordIsValid: boolean = false;
  emailIsValid: boolean = false;
  isEmailValid: boolean = false;
  isFirstNameValid: boolean = false;
  validCustomer: boolean = false;

  validateCustomer() {
    this.isFirstNameValid = /^.{3,}$/.test(this.firstName);
    if (this.isFirstNameValid) {
      this.validCustomer = true;
    } else {
      this.validCustomer = false;
    }
  }

  validatePassword() {
    this.isMinTenChar = /[\w]{10,}/.test(this.password);
    this.isMinOneNum = /[\d]/.test(this.password);
    this.isMinOneUppercase = /[A-Z]/.test(this.password);
    this.isMinOneLowercase = /[a-z]/.test(this.password);

    if (
      this.isMinTenChar &&
      this.isMinOneLowercase &&
      this.isMinOneNum &&
      this.isMinOneUppercase
    ) {
      if (this.password === this.confirmPassword) {
        this.passwordIsValid = true;
      } else {
        this.passwordIsValid = false;
      }
    } else {
      this.passwordIsValid = false;
    }
  }
  validateEmail() {
    this.isEmailValid =
      /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/.test(this.email);
    if (this.isEmailValid) {
      this.emailIsValid = true;
    } else {
      this.emailIsValid = false;
    }
  }

}
