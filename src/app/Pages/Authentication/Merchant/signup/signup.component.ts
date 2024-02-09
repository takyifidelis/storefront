import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-merchant',
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupMerchantComponent {
  mailIcon = faEnvelope;
  eyeIcon = faEyeSlash;
  googleIcon = faGoogle;
  facebookIcon = faFacebook;
  ol = faCircle;
  // input fields
  // email: string = '';
  // password: string = '';
  // confirmPassword: string = '';

  // businessName: string = '';

  // confirmPassword: string = '';
  // isValid: boolean = false;
  // isMinTenChar: boolean = false;
  // isMinOneNum: boolean = false;
  // emailIsValid: boolean = false;
  // isEmailValid: boolean = false;
  // passwordIsValid: boolean = false;
  // isMinOneUppercase: boolean = false;
  // isMinOneLowercase: boolean = false;
  // isBusinessNameValid: boolean = false;
  // isFirstNameValid: boolean = false;
  // validMerchant: boolean = false;
  signupForm: FormGroup;

  constructor() {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(128),
        Validators.pattern(
          /^[a-z0-9]+(?:\.[a-z0-9]+)*@[a-z0-9]+(?:\.[a-z0-9]+)+$/
        ),
      ]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      businessName: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }
}
