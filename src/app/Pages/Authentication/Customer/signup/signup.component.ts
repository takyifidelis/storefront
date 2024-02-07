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

  // Email and Password Validation Below

  constructor() {}

  // Email Validation
  // Password Validation

  password: string = '';
  confirmPassword: string = '';
  isValid: boolean = false;
  isMinTenChar: boolean = false;
  isMinOneNum: boolean = false;
  isMinOneUppercase: boolean = false;
  isMinOneLowercase: boolean = false;

  validatePassword() {
    this.isMinTenChar = /[\w]{10,}/.test(this.password);
    this.isMinOneNum = /[\d]/.test(this.password);
    this.isMinOneUppercase = /[A-Z]/.test(this.password);
    this.isMinOneLowercase = /[a-z]/.test(this.password);
  }
}
